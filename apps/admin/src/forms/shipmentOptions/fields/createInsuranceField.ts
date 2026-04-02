import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {PROP_OPTIONS} from '../field';
import {
  createHasShipmentOptionWatcher,
  isPackageTypePackageOrSmall,
  resolveFormComponent,
  setFieldProp,
} from '../../helpers';
import {type ElementInstance} from '../../../types';
import {AdminComponent} from '../../../data';
import {useLocalizedFormatter} from '../../../composables';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {createShipmentOptionField} from './createShipmentOptionField';
import {createRef} from './createRef';
import {getInsuranceOptions} from '../../helpers/getInsuranceOptions';

/**
 * Custom field factory for the insurance shipment option.
 *
 * Renders as a select/dropdown instead of a TriState toggle. Insurance
 * amount brackets are derived from `optionData.insuredAmount` (min/max/default)
 * provided by the carrier context.
 */
export const createInsuranceField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();
  const optionKey = fieldName.split('.').pop() ?? fieldName;

  return createShipmentOptionField(refs, fieldName, optionData, {
    ref: createRef(refs, fieldName, 0),
    component: resolveFormComponent(AdminComponent.SelectInput),
    visibleWhen: createHasShipmentOptionWatcher(optionKey, false, isPackageTypePackageOrSmall),
    disabledWhen: createHasShipmentOptionWatcher(optionKey, true, isPackageTypePackageOrSmall),
    onBeforeMount(field: ElementInstance) {
      const insurancePossibilities = getInsuranceOptions(optionData, formatter);

      setFieldProp(field, PROP_OPTIONS, insurancePossibilities);
    },
  });
};
