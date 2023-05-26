import {type Shipment} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {getCarrierOptions} from './getCarrierOptions';

export const hasShipmentOption = (form: FormInstance, option: keyof Shipment.ModelShipmentOptions): boolean => {
  const carrierOptions = getCarrierOptions(form);
  return Boolean(carrierOptions?.capabilities.shipmentOptions[option]);
};
