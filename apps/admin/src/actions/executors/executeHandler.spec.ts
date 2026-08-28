// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {ApiException} from '@myparcel-dev/sdk';
import {Variant} from '@myparcel-dev/pdk-common';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import {type ActionContext} from './types';
import {executeHandler} from './executeHandler';

const ERROR_NOTIFICATION = {
  category: NotificationCategory.Action,
  title: 'Something went wrong',
  variant: Variant.Error,
};

const BACKEND_NOTIFICATION = {
  category: NotificationCategory.Action,
  content: ['Street is required.'],
  title: 'The given data was invalid.',
  variant: Variant.Error,
};

const createContext = (handler: () => Promise<unknown>): ActionContext =>
  ({
    action: {name: 'ordersPrint', handler},
    instance: {logger: {debug: vi.fn(), error: vi.fn()}},
    notifications: {[Variant.Error]: ERROR_NOTIFICATION},
    parameters: {},
  } as unknown as ActionContext);

/**
 * PdkFetchClient adds the notifications of an error response to the store and then throws.
 */
const createApiException = (notifications?: unknown[]): ApiException => {
  const store = useNotificationStore();

  notifications?.forEach((notification) => store.add(notification as never));

  return new ApiException({
    errors: [{code: 400, message: 'Request failed.'}],
    ...(notifications ? {notifications} : {}),
  } as never);
};

describe('executeHandler', () => {
  beforeEach(() => {
    doComponentTestSetup();
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it('reports a failing action to the user', async () => {
    const context = createContext(() => Promise.reject(new Error('Printing failed')));

    await executeHandler(context);

    expect(useNotificationStore().notifications).toMatchObject([
      {category: NotificationCategory.Action, content: 'Printing failed', variant: Variant.Error},
    ]);
  });

  it('does not report a failure the backend already reported', async () => {
    const store = useNotificationStore();
    const context = createContext(() => Promise.reject(createApiException([BACKEND_NOTIFICATION])));

    await executeHandler(context);

    expect(store.notifications).toHaveLength(1);
    expect(store.notifications[0].title).toBe('The given data was invalid.');
  });

  it('reports a failure the backend did not report itself', async () => {
    const store = useNotificationStore();
    const context = createContext(() => Promise.reject(createApiException()));

    await executeHandler(context);

    expect(store.notifications).toMatchObject([{title: 'Something went wrong', variant: Variant.Error}]);
  });

  it('still reports the failure when an unrelated error notification is in the store', async () => {
    const store = useNotificationStore();

    const context = createContext(() => {
      store.add({category: NotificationCategory.Api, content: 'Unrelated', variant: Variant.Error});

      return Promise.reject(new Error('Printing failed'));
    });

    await executeHandler(context);

    expect(store.notifications).toHaveLength(2);
    expect(store.notifications[1]).toMatchObject({content: 'Printing failed', variant: Variant.Error});
  });
});
