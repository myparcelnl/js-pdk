// @vitest-environment happy-dom

import {beforeEach, describe, expect, it} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {AdminModalKey} from '../data';
import {useModalStore} from './useModalStore';

describe('useModalStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('gives every opened modal a new token', () => {
    const modalStore = useModalStore();

    modalStore.open(AdminModalKey.ShipmentOptions);
    const first = modalStore.token;

    modalStore.open(AdminModalKey.ShipmentOptions);

    expect(first).toEqual({modal: AdminModalKey.ShipmentOptions});
    expect(modalStore.token).not.toBe(first);
  });

  it('removes the token when the modal closes', () => {
    const modalStore = useModalStore();

    modalStore.open(AdminModalKey.PrintOptions);
    modalStore.close();

    expect(modalStore.token).toBeNull();
  });
});
