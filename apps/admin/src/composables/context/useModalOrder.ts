import {useModalStore} from '../../stores/useModalStore';
import {AdminModalKey} from '../../data/constants';

export const useModalOrder = (): string | null => {
  const store = useModalStore();

  if (store.opened && [AdminModalKey.ShipmentOptions].includes(store.opened)) {
    // @ts-expect-error works
    return store.context.orderIds;
  }

  return null;
};
