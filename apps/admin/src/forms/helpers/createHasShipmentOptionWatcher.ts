import {type InteractiveElementInstance, type FormInstance} from '@myparcel-dev/vue-form-builder';
import {isPackageTypePackage} from './isPackageTypePackage';
import {hasShipmentOption} from './hasShipmentOption';

/**
 * Creates a watcher that shows/hides a field based on whether the selected
 * carrier supports the given shipment option.
 *
 * Accepts `string` for the option name because options are dynamic.
 */
export const createHasShipmentOptionWatcher = (
  shipmentOption: string,
  invert = false,
  validator: (form: FormInstance) => boolean = isPackageTypePackage,
): ((field: InteractiveElementInstance) => boolean) => {
  return ({form}) => (validator(form) && hasShipmentOption(form, shipmentOption)) !== invert;
};
