import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {getCarrierForShipment} from './getCarrierForShipment';

/**
 * Check whether the chosen shipment configuration supports a given shipment option.
 *
 * Reads from the shipment-scoped carrier (full selection narrows the option set); falls
 * through to order-level data when shipment data isn't available yet (see
 * {@link getCarrierForShipment}).
 *
 * Accepts `string` (not a narrower type) because option names are dynamic — they come from
 * `carrier.options` in the response and are not a fixed set.
 */
export const hasShipmentOption = (form: FormInstance, option: string): boolean => {
  const carrier = getCarrierForShipment(form);

  return Object.hasOwn(carrier?.options ?? {}, option);
};
