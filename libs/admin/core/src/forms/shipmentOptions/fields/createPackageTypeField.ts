import {snakeCase} from 'lodash-unified';
import {AdminComponent} from '@myparcel-pdk/admin-common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_PACKAGE_TYPE, SHIPMENT_OPTIONS} from '../field';
import {defineFormField, resolveFormComponent} from '../../helpers';
import {createRef} from './createRef';

export const createPackageTypeField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return defineFormField({
    name: FIELD_PACKAGE_TYPE,
    label: snakeCase(`${SHIPMENT_OPTIONS}_package_type`),
    ref: createRef<PackageTypeName>(refs, FIELD_PACKAGE_TYPE, PackageTypeName.Package),
    component: resolveFormComponent(AdminComponent.RadioGroup),
  });
};
