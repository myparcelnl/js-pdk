import {AdminModalKey} from '../../data';

export const createShipmentFormName = (orderId?: string): string => {
  if (!orderId) {
    orderId = 'bulk';
  }

  return `${AdminModalKey.ShipmentOptions}_${orderId}`;
};
