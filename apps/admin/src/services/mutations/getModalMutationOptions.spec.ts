// @vitest-environment happy-dom

import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useModalStore, useNotificationStore} from '../../stores';
import {AdminModalKey} from '../../data';
import {getModalMutationOptions} from './getModalMutationOptions';

describe('getModalMutationOptions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('changes the modal that started the mutation', () => {
    const modalStore = useModalStore();
    const options = getModalMutationOptions();

    modalStore.open(AdminModalKey.ShipmentOptions);
    modalStore.loading = true;
    const context = options.onMutate?.(undefined);

    options.onError?.(new Error('failed'), undefined, context);
    options.onSettled?.(undefined, null, undefined, context);
    options.onSuccess?.(undefined, undefined, context);

    expect(useNotificationStore().notifications).toHaveLength(1);
    expect(modalStore.loading).toBe(false);
    expect(modalStore.opened).toBeNull();
  });

  it('leaves a modal alone that the user opened after the mutation started', () => {
    const modalStore = useModalStore();
    const options = getModalMutationOptions();

    modalStore.open(AdminModalKey.ShipmentOptions);
    const context = options.onMutate?.(undefined);

    // The user closes the modal with Escape and opens the modal of another order.
    modalStore.close();
    modalStore.open(AdminModalKey.ShipmentOptions, {orderIds: ['2']});
    modalStore.loading = true;

    options.onError?.(new Error('failed'), undefined, context);
    options.onSettled?.(undefined, null, undefined, context);
    options.onSuccess?.(undefined, undefined, context);

    expect(useNotificationStore().notifications).toHaveLength(0);
    expect(modalStore.loading).toBe(true);
    expect(modalStore.opened).toBe(AdminModalKey.ShipmentOptions);
  });

  it('still runs the onMutate it replaces', () => {
    const onMutate = vi.fn();

    void getModalMutationOptions({onMutate}).onMutate?.(undefined);

    expect(onMutate).toHaveBeenCalledOnce();
  });
});
