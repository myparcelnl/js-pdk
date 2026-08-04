import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_HEIGHT, FIELD_LENGTH, FIELD_WIDTH, type FieldName} from '../field';
import {defineFormField, resolveFormComponent} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * The parcel dimensions the merchant may fill in manually, in centimeters — the same unit the API
 * expects and the backoffice shows, so nothing is converted.
 *
 * `min` is a UX guard, not validation
 *
 * The refs have no fallback on purpose. An untouched field must stay undefined so it is left out of
 * the request entirely; defaulting to 0 would send a dimension the merchant never entered.
 */
const DIMENSION_FIELDS: [name: FieldName, label: string][] = [
  [FIELD_LENGTH, 'length_in_cm'],
  [FIELD_WIDTH, 'width_in_cm'],
  [FIELD_HEIGHT, 'height_in_cm'],
];

export const createDimensionFields = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration[] =>
  DIMENSION_FIELDS.map(([name, label]) =>
    defineFormField({
      name,
      label,
      ref: createRef<number | undefined>(refs, name),
      component: resolveFormComponent(AdminComponent.NumberInput),
      attributes: {min: 0},
    }),
  );
