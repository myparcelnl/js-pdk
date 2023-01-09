import {ModalKey} from '../../types';

export const createShipmentFormName = (orderId: string): string => `${ModalKey.SHIPMENT_OPTIONS}_${orderId}`;
