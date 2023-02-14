import {AdminModalKey} from '../../types';

export const createShipmentFormName = (orderId: string): string => `${AdminModalKey.SHIPMENT_OPTIONS}_${orderId}`;
