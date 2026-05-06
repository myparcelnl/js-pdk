import {toValue, watch} from 'vue';
import {type InteractiveElementConfiguration, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_CARRIER, PROP_OPTIONS} from '../field';
import {resolveFormComponent, setFieldProp, useFormCapabilities} from '../../helpers';
import {type ElementInstance} from '../../../types';
import {AdminComponent} from '../../../data';
import {useLocalizedFormatter} from '../../../composables';
import {createShipmentOptionField} from './createShipmentOptionField';
import {createRef} from './createRef';

/**
 * Custom field factory for the insurance shipment option.
 *
 * Renders as a select/dropdown instead of a TriState toggle. Insurance amount brackets are
 * derived from the currently selected carrier's `insuredAmount` data (min/max) and refresh
 * automatically on carrier switch.
 *
 * Visibility / disabled state is inherited from {@link createShipmentOptionField} — driven
 * purely by `hasShipmentOption` (i.e. by the capabilities response). No manual package-type
 * gating: if insurance isn't valid for the current combination, the API won't include it in
 * `carrier.options` and the field will hide.
 */
export const createInsuranceField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();
  const caps = useFormCapabilities();
  let stopWatcher: (() => void) | undefined;

  return createShipmentOptionField(refs, fieldName, {
    ref: createRef(refs, fieldName, 0),
    component: resolveFormComponent(AdminComponent.SelectInput),
    onBeforeMount(field: ElementInstance) {
      stopWatcher?.();

      const carrierField = field.form.getField(FIELD_CARRIER) as InteractiveElementInstance | undefined;

      if (carrierField) {
        stopWatcher = watch(
          () => toValue(carrierField.ref),
          () => {
            setFieldProp(field, PROP_OPTIONS, caps.getInsuranceOptions(field.form, formatter));
          },
          {immediate: true},
        );
      }
    },
  });
};
