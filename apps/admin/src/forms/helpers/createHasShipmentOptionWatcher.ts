import { type Shipment } from '@myparcel-pdk/common';
import { type InteractiveElementInstance, type FormInstance } from '@myparcel/vue-form-builder';
import { isPackageTypePackage } from './isPackageTypePackage';
import { hasShipmentOption } from './hasShipmentOption';

export const createHasShipmentOptionWatcher = (
  shipmentOption: keyof Shipment.ModelShipmentOptions,
  invert = false,
  validator: (form: FormInstance) => boolean = isPackageTypePackage,
): ((field: InteractiveElementInstance) => boolean) => {
  return ({ form }) => (validator(form) && hasShipmentOption(form, shipmentOption)) !== invert;
};
