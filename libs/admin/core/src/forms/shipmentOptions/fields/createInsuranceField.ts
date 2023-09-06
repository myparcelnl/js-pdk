import {AdminComponent} from '@myparcel-pdk/admin-common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {getInsuranceOptions} from '../helpers';
import {FIELD_INSURANCE, PROP_OPTIONS} from '../field';
import {resolveFormComponent, setFieldProp} from '../../helpers';
import {type ElementInstance} from '../../../types';
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
