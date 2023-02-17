import {FormInstance} from '@myparcel/vue-form-builder';
import {Shipment} from '@myparcel-pdk/common/src';
import {getCarrierOptions} from './getCarrierOptions';

export const hasShipmentOption = (form: FormInstance, option: keyof Shipment.ModelShipmentOptions): boolean => {
  const carrierOptions = getCarrierOptions(form);
  return Boolean(carrierOptions?.capabilities.shipmentOptions[option]);
};
