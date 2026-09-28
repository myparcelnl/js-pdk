import {beforeEach, describe, expect, it} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {Variant} from '@myparcel-dev/pdk-common';
import {NotificationCategory, NotificationSource} from '../data';
import {useNotificationStore} from './useNotificationStore';

const ids = () => useNotificationStore().notifications.map((notification) => notification.id);

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const store = useNotificationStore();

    store.add({id: 'from-api', variant: Variant.Error, timeout: false}, {source: NotificationSource.Api});
    store.add({id: 'labels', variant: Variant.Info, category: NotificationCategory.General, timeout: false});
  });

  it('removes only the notifications from the given source', () => {
    useNotificationStore().remove(NotificationSource.Api);

    expect(ids()).toEqual(['labels']);
  });

  it('removes a notification by id', () => {
    useNotificationStore().remove('labels');

    expect(ids()).toEqual(['from-api']);
  });
});
