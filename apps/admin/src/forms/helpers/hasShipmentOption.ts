import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {getCarrier} from './getCarrier';

/**
 * Check whether the selected carrier supports a given shipment option.
 *
 * Accepts `string` (not a narrower type) because option names are dynamic —
 * they come from `carrier.options` in the context and are not a fixed set.
 */
export const hasShipmentOption = (form: FormInstance, option: string): boolean => {
  const carrier = getCarrier(form);

  return Object.hasOwn(carrier?.options ?? {}, option);
};
