import {AdminModalKey} from '../../types';
import {useModalStore} from '../../stores';

export const useModalOrder = (): string | null => {
  const store = useModalStore();

  if (store.opened && [AdminModalKey.ShipmentOptions].includes(store.opened)) {
    // @ts-expect-error works
    return store.context.orderIds;
  }

  return null;
};
