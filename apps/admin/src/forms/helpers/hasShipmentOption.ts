import { type Shipment } from '@myparcel-dev/pdk-common';
import { type FormInstance } from '@myparcel-dev/vue-form-builder';
import { getCarrier } from './getCarrier';

export const hasShipmentOption = (form: FormInstance, option: keyof Shipment.ModelShipmentOptions): boolean => {
  const carrier = getCarrier(form);
  return Boolean(carrier?.capabilities.shipmentOptions[option]);
};
