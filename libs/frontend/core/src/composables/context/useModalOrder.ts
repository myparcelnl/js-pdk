import {AdminModalKey} from '../../types';
import {useModalStore} from '../../stores';

export const useModalOrder = (): string | null => {
  const store = useModalStore();

  if (store.opened && [AdminModalKey.SHIPMENT_OPTIONS].includes(store.opened)) {
    return store.context;
  }

  return null;
};
