import {snakeCase} from 'lodash-unified';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_PACKAGE_TYPE, SHIPMENT_OPTIONS} from '../field';
import {resolveFormComponent} from '../../helpers/resolveFormComponent';
import {defineFormField} from '../../helpers/defineFormField';
import {AdminComponent} from '../../../data/components';
import {createRef} from './createRef';

export const createPackageTypeField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return defineFormField({
    name: FIELD_PACKAGE_TYPE,
    label: snakeCase(`${SHIPMENT_OPTIONS}_package_type`),
    ref: createRef<PackageTypeName>(refs, FIELD_PACKAGE_TYPE, PackageTypeName.Package),
    component: resolveFormComponent(AdminComponent.RadioGroup),
  });
};
