// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
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

const createContext = (handler: () => Promise<unknown>): ActionContext =>
  ({
    action: {name: 'ordersPrint', handler},
    instance: {logger: {debug: vi.fn(), error: vi.fn()}},
    notifications: {[Variant.Error]: ERROR_NOTIFICATION},
    parameters: {},
  } as unknown as ActionContext);

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

  it('still reports the failure when only an info notification was added', async () => {
    const store = useNotificationStore();

    const context = createContext(() => {
      store.add({category: NotificationCategory.Action, content: 'Exporting order', variant: Variant.Info});

      return Promise.reject(new Error('Printing failed'));
    });

    await executeHandler(context);

    expect(store.notifications).toHaveLength(2);
    expect(store.notifications[1]).toMatchObject({content: 'Printing failed', variant: Variant.Error});
  });

  it('does not report a failure the backend already reported', async () => {
    const store = useNotificationStore();

    const context = createContext(() => {
      store.add({
        category: NotificationCategory.Action,
        content: ['Street is required.'],
        title: 'The given data was invalid.',
        variant: Variant.Error,
      });

      return Promise.reject(new Error('Request failed. Status code: 400.'));
    });

    await executeHandler(context);

    expect(store.notifications).toHaveLength(1);
    expect(store.notifications[0].title).toBe('The given data was invalid.');
  });
});
