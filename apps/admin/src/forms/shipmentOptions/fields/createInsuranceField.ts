import {toValue, watch} from 'vue';
import {type InteractiveElementConfiguration, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_CARRIER, PROP_OPTIONS} from '../field';
import {
  createHasShipmentOptionWatcher,
  isPackageTypePackageOrSmall,
  resolveFormComponent,
  setFieldProp,
} from '../../helpers';
import {type ElementInstance} from '../../../types';
import {AdminComponent} from '../../../data';
import {useLocalizedFormatter} from '../../../composables';
import {createShipmentOptionField} from './createShipmentOptionField';
import {createRef} from './createRef';
import {getInsuranceOptions} from '../../helpers/getInsuranceOptions';

/**
 * Custom field factory for the insurance shipment option.
 *
 * Renders as a select/dropdown instead of a TriState toggle. Insurance
 * amount brackets are derived from the currently selected carrier's
 * `insuredAmount` data (min/max) and refresh automatically on carrier switch.
 */
export const createInsuranceField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();
  const optionKey = fieldName.split('.').pop() ?? fieldName;
  let stopWatcher: (() => void) | undefined;

  return createShipmentOptionField(refs, fieldName, {
    ref: createRef(refs, fieldName, 0),
    component: resolveFormComponent(AdminComponent.SelectInput),
    visibleWhen: createHasShipmentOptionWatcher(optionKey, false, isPackageTypePackageOrSmall),
    disabledWhen: createHasShipmentOptionWatcher(optionKey, true, isPackageTypePackageOrSmall),
    onBeforeMount(field: ElementInstance) {
      stopWatcher?.();

      const carrierField = field.form.getField(FIELD_CARRIER) as InteractiveElementInstance | undefined;

      if (carrierField) {
        stopWatcher = watch(() => toValue(carrierField.ref), () => {
          setFieldProp(field, PROP_OPTIONS, getInsuranceOptions(field.form, formatter));
        }, {immediate: true});
      }
    },
  });
};
