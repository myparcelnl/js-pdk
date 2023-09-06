import {type Shipment} from '@myparcel-pdk/admin-common';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {isPackageTypePackage} from './isPackageTypePackage';
import {hasShipmentOption} from './hasShipmentOption';

export const createHasShipmentOptionWatcher = (
  shipmentOption: keyof Shipment.ModelShipmentOptions,
  invert = false,
): ((field: InteractiveElementInstance) => boolean) => {
  return ({form}) => (isPackageTypePackage(form) && hasShipmentOption(form, shipmentOption)) !== invert;
};
