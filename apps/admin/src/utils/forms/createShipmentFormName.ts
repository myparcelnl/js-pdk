import {AdminModalKey} from '../../data/constants';

export const createShipmentFormName = (orderId?: string): string => {
  if (!orderId) {
    orderId = 'bulk';
  }

  return `${AdminModalKey.ShipmentOptions}_${orderId}`;
};
