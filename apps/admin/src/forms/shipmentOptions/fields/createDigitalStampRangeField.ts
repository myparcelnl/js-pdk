import {ref} from 'vue';
import {get} from 'lodash-unified';
import {get as vuGet} from '@vueuse/core';
import {TriState} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from '../field';
import {createDefaultOption, defineFormField, resolveFormComponent} from '../../helpers';
import {type GlobalFieldProps, type OptionsProp} from '../../../types';
import {AdminComponent} from '../../../data';
import {useDigitalStampRanges, useOrderData, usePluginSettings} from '../../../composables';

export const createDigitalStampRangeField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  const pluginSettings = usePluginSettings();
  const {order} = useOrderData();

  const orderData = vuGet(order);

  const {initialWeight, manualWeight} = orderData?.physicalProperties ?? {};

  const totalWeight = Number(initialWeight) + Number(pluginSettings.order.emptyDigitalStampWeight ?? 0);

  const {ranges, currentRange} = useDigitalStampRanges(orderData);

  const selectedValue =
    TriState.Inherit === manualWeight
      ? TriState.Inherit
      : (get(refs, FIELD_MANUAL_WEIGHT, manualWeight) as number) ?? currentRange.value?.value;

  return defineFormField({
    name: FIELD_MANUAL_WEIGHT,
    label: 'weight_range',
    ref: ref(selectedValue ?? TriState.Inherit),
    component: resolveFormComponent(AdminComponent.SelectInput),
    visibleWhen: (field) => PackageTypeName.DigitalStamp === field.form.getValue(FIELD_PACKAGE_TYPE),
    disabledWhen: (field) => PackageTypeName.DigitalStamp !== field.form.getValue(FIELD_PACKAGE_TYPE),
    props: {
      subtext: {
        key: 'order_weight',
        args: {
          // eslint-disable-next-line id-length
          n: totalWeight,
        },
      },
      options: [createDefaultOption(currentRange.value?.plainLabel), ...ranges.value],
    } satisfies OptionsProp & GlobalFieldProps,
  });
};
