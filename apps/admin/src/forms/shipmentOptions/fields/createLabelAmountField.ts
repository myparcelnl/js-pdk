import {snakeCase} from 'lodash-unified';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_LABEL_AMOUNT, LABEL_AMOUNT} from '../field';
import {resolveFormComponent} from '../../helpers/resolveFormComponent';
import {defineFormField} from '../../helpers/defineFormField';
import {AdminComponent} from '../../../data/components';
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
