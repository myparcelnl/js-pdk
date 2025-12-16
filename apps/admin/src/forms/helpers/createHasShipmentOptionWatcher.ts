import { type Shipment } from '@myparcel-dev/pdk-common';
import { type InteractiveElementInstance, type FormInstance } from '@myparcel-dev/vue-form-builder';
import { isPackageTypePackage } from './isPackageTypePackage';
import { hasShipmentOption } from './hasShipmentOption';

export const createHasShipmentOptionWatcher = (
  shipmentOption: keyof Shipment.ModelShipmentOptions,
  invert = false,
  validator: (form: FormInstance) => boolean = isPackageTypePackage,
): ((field: InteractiveElementInstance) => boolean) => {
  return ({ form }) => (validator(form) && hasShipmentOption(form, shipmentOption)) !== invert;
};
