import {snakeCase} from 'lodash-es';
import {AdminComponent} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_LABEL_AMOUNT, LABEL_AMOUNT} from '../field';
import {defineFormField, resolveFormComponent} from '../../helpers';
import {createRef} from './createRef';

export const createLabelAmountField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return defineFormField({
    name: FIELD_LABEL_AMOUNT,
    label: snakeCase(LABEL_AMOUNT),
    ref: createRef<number>(refs, FIELD_LABEL_AMOUNT, 1),
    component: resolveFormComponent(AdminComponent.NumberInput),
    props: {
      min: 1,
      max: 10,
    },
  });
};
