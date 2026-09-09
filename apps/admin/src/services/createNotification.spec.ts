// @vitest-environment happy-dom

import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../types';
import {useQueryStore} from '../stores';
import {NotificationCategory} from '../data';
import {doComponentTestSetup, doComponentTestTeardown, mockDefaultTranslations} from '../__tests__';
import {createNotification} from './createNotification';

/**
 * createNotification needs the translations, which are only available inside a setup context.
 */
const create = (options: Parameters<typeof createNotification>[1]): undefined | PdkNotification => {
  let notification: undefined | PdkNotification;

  mount({
    setup() {
      useQueryStore().registerContextQueries();
      notification = createNotification(Variant.Error, options);

      return () => null;
    },
  });

  return notification;
};

describe('createNotification', () => {
  beforeAll(() => {
    mockDefaultTranslations.mockReturnValue({
      notification_action_error: 'Something went wrong',
      notification_action_error_body: 'Try again later.',
    });
  });

  beforeEach(() => {
    doComponentTestSetup();
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  afterAll(() => {
    mockDefaultTranslations.mockReset();
  });

  it('translates the title it derives from the category', () => {
    expect(create({category: NotificationCategory.Action})).toMatchObject({
      category: NotificationCategory.Action,
      content: 'Try again later.',
      title: 'Something went wrong',
      variant: Variant.Error,
    });
  });

  it('leaves a title that was passed in untouched', () => {
    expect(create({title: 'Street is required.'})?.title).toBe('Street is required.');
  });

  it('returns undefined when there is nothing to show', () => {
    expect(create({category: NotificationCategory.General})).toBeUndefined();
  });
});
