// @vitest-environment happy-dom

import {describe, expect, it} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useModalStore, useNotificationStore} from '../../stores';
import {AdminModalKey, NotificationCategory} from '../../data';
import {getModalMutationOptions} from './getModalMutationOptions';

describe('getModalMutationOptions', () => {
  it('closes the modal of its own admin instance when the mutation finishes after a remount', () => {
    const oldStore = createPinia();
    const newStore = createPinia();

    setActivePinia(oldStore);
    const options = getModalMutationOptions();

    // The old admin is disposed, a new one mounts and the user opens a modal there.
    setActivePinia(newStore);
    useModalStore(newStore).open(AdminModalKey.PrintOptions);

    options.onSuccess?.(undefined, undefined, undefined);
    options.onError?.(new Error('late failure'), undefined, undefined);

    expect(useModalStore(newStore).opened).toBe(AdminModalKey.PrintOptions);
    expect(useNotificationStore(newStore).notifications).toHaveLength(0);
    expect(useNotificationStore(oldStore).notifications.map(({category}) => category)).toEqual([
      NotificationCategory.Modal,
    ]);
  });
});
