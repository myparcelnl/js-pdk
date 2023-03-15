import {AdminModalKey} from '../../types';

export const createShipmentFormName = (orderId?: string): string => {
  if (!orderId) {
    orderId = 'bulk';
  }

  return `${AdminModalKey.ShipmentOptions}_${orderId}`;
};
