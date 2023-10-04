import {snakeCase} from 'lodash-unified';
import {type ElementInstance, getInsuranceOptions} from '@myparcel-pdk/admin-core';
import {AdminComponent} from '@myparcel-pdk/admin-common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {
  DIGITAL_STAMP_WEIGHT,
  FIELD_DIGITAL_STAMP_WEIGHT,
  FIELD_LABEL_AMOUNT,
  LABEL_AMOUNT,
  PROP_OPTIONS,
} from '../field';
import {defineFormField, resolveFormComponent, setFieldProp} from '../../helpers';
import {createRef} from './createRef';

export const createDigitalStampWeightField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return defineFormField({
    name: FIELD_DIGITAL_STAMP_WEIGHT,
    label: snakeCase(DIGITAL_STAMP_WEIGHT),
    ref: createRef<number>(refs, FIELD_DIGITAL_STAMP_WEIGHT, 1),
    component: resolveFormComponent(AdminComponent.SelectInput),
    onBeforeMount(field: ElementInstance) {
      const insurancePossibilities = getInsuranceOptions(field, formatter);

      setFieldProp(field, PROP_OPTIONS, insurancePossibilities);
    },
  });
};
