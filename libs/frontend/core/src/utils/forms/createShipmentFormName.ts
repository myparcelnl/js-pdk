import {AdminModalKey} from '../../types';

export const createShipmentFormName = (orderId: string): string => `${AdminModalKey.ShipmentOptions}_${orderId}`;
