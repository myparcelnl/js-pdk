import {ModalKey, useModalStore} from '../';

export const useModalOrder = (): string | null => {
  const store = useModalStore();

  if (store.opened && [ModalKey.SHIPMENT_OPTIONS].includes(store.opened)) {
    return store.context;
  }

  return null;
};
