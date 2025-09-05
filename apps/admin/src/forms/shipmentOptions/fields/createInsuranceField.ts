import {DefaultSelectInput} from '@myparcel-pdk/admin-preset-default';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_INSURANCE, PROP_OPTIONS} from '../field';
import {getInsuranceOptions, setFieldProp} from '../../helpers';
import {type ElementInstance} from '../../../types';
import {useLocalizedFormatter} from '../../../composables';
import {createShipmentOptionField} from './createShipmentOptionField';
import {createRef} from './createRef';

export const createInsuranceField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();

  return createShipmentOptionField(refs, FIELD_INSURANCE, {
    ref: createRef(refs, FIELD_INSURANCE, 0),
    component: DefaultSelectInput,
    onBeforeMount(field: ElementInstance) {
      const insurancePossibilities = getInsuranceOptions(field, formatter);
      setFieldProp(field, PROP_OPTIONS, insurancePossibilities);
    },
  });
};
