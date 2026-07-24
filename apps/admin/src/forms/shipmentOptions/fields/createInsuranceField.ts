import {watch} from 'vue';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {PROP_OPTIONS} from '../field';
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
 * derived from the currently selected carrier's shipment-scoped `insuredAmount` data (min/max)
 * and refresh automatically whenever that data changes — i.e. on carrier change AND on
 * packageType / deliveryType / weight / cc change, since those all narrow the shipment-scoped
 * capabilities response.
 *
 * Visibility / disabled state is inherited from {@link createShipmentOptionField} — resolved
 * by the option-state module from the capabilities response. No manual package-type
 * gating: if insurance isn't valid for the current combination, the API won't include it in
 * `carrier.options` and the field will hide.
 */
export const createInsuranceField = (refs: ShipmentOptionsRefs, fieldName: string): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();
  const capabilities = useFormCapabilities();
  let stopWatcher: (() => void) | undefined;

  return createShipmentOptionField(refs, fieldName, {
    ref: createRef(refs, fieldName, 0),
    component: resolveFormComponent(AdminComponent.SelectInput),
    onBeforeMount(field: ElementInstance) {
      stopWatcher?.();

      // Watch the shipment-scoped carrier capabilities directly. The resolver tracks both the
      // selected carrier (via `form.getValue(FIELD_CARRIER)`) and the shipment-capabilities
      // query data, so any axis change that updates `insuredAmount` triggers a refresh.
      stopWatcher = watch(
        () => capabilities.getCarrierCapabilitiesForShipment(field.form),
        () => {
          setFieldProp(field, PROP_OPTIONS, capabilities.getInsuranceOptions(field.form, formatter));
        },
        {immediate: true},
      );
    },
  });
};
