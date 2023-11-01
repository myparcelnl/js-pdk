import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_INSURANCE, PROP_OPTIONS} from '../field';
import {getInsuranceOptions, resolveFormComponent, setFieldProp} from '../../helpers';
import {type ElementInstance} from '../../../types';
import {AdminComponent} from '../../../data';
import {useLocalizedFormatter} from '../../../composables';
import {createShipmentOptionField} from './createShipmentOptionField';
import {createRef} from './createRef';

export const createInsuranceField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();

  return createShipmentOptionField(refs, FIELD_INSURANCE, {
    ref: createRef(refs, FIELD_INSURANCE, 0),
    component: resolveFormComponent(AdminComponent.SelectInput),
    onBeforeMount(field: ElementInstance) {
      const insurancePossibilities = getInsuranceOptions(field, formatter);

      setFieldProp(field, PROP_OPTIONS, insurancePossibilities);
    },
  });
};
