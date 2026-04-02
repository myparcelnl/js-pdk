import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from './types';
import {createPriorityDeliveryField} from './fields/createPriorityDeliveryField';
import {createInsuranceField} from './fields/createInsuranceField';
import {type CarrierOptionData} from './carrierOptionData.types';

/**
 * Factory function signature for custom shipment option field creators.
 *
 * Uses `string` for fieldName because option names are determined at runtime
 * from the carrier context and are not a fixed compile-time set.
 */
export type FieldFactory = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
) => InteractiveElementConfiguration;

/**
 * Registry of shipment option names that require custom field rendering.
 *
 * Options NOT listed here are rendered as generic TriState toggles by
 * `createShipmentOptionField`. Each entry maps an option name (as it
 * appears in `carrier.options`) to its custom factory function.
 *
 * Current exceptions:
 * - `insurance`: renders as a select/dropdown with amount brackets
 *   derived from `insuredAmount` in the option data.
 * - `priorityDelivery`: uses a mailbox package type validator for
 *   show/hide logic (@TODO replace when context provides this reactively).
 */
export const fieldFactoryRegistry: Record<string, FieldFactory> = {
  insurance: createInsuranceField,
  priorityDelivery: createPriorityDeliveryField,
};
