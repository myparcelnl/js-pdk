import {ref} from 'vue';
import {first, get, last} from 'lodash-unified';
import {get as vuGet} from '@vueuse/core';
import {AdminComponent, type Plugin, type SelectOption} from '@myparcel-pdk/admin-common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from '../field';
import {createDefaultOption, defineFormField, resolveFormComponent} from '../../helpers';
import {type GlobalFieldProps, type OptionsProp} from '../../../types';
import {TriState} from '../../../data';
import {useOrderData, usePluginSettings} from '../../../composables';

export const createDigitalStampRangeField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  const pluginSettings = usePluginSettings();
  const {order} = useOrderData();

  const orderData = vuGet(order);

  const {digitalStampRanges} = orderData;
  const {initialWeight, manualWeight} = orderData?.physicalProperties ?? {};

  const ranges: Plugin.ModelContextOrderDataContext['digitalStampRanges'] = digitalStampRanges ?? [];

  const rangeOptions = ranges.map((range) => ({
    plainLabel: `${range.min}g – ${range.max}g`,
    value: range.average,
  })) satisfies SelectOption[];

  const defaultRange = ranges.find((range) => {
    return (range.min <= initialWeight && range.max >= initialWeight) ?? first(rangeOptions);
  });

  const selectedValue =
    TriState.Inherit === manualWeight
      ? TriState.Inherit
      : (get(refs, FIELD_MANUAL_WEIGHT, manualWeight) as number) ?? defaultRange?.average;

  const defaultOption = rangeOptions.find((option) => option.value === defaultRange?.average) ?? last(rangeOptions);

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
          n: Number(initialWeight) + Number(pluginSettings.order.emptyDigitalStampWeight ?? 0),
        },
      },
      options: [createDefaultOption(defaultOption?.plainLabel), ...rangeOptions],
    } satisfies OptionsProp & GlobalFieldProps,
  });
};
