import {ref, toValue} from 'vue';
import {get} from 'lodash-unified';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type Plugin, TriState} from '@myparcel-dev/pdk-common';
import {PackageTypeName} from '@myparcel-dev/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from '../field';
import {createDefaultOption, defineFormField, resolveFormComponent} from '../../helpers';
import {type GlobalFieldProps, type OptionsProp} from '../../../types';
import {AdminComponent} from '../../../data';
import {useDigitalStampRanges, useOrderData, usePluginSettings} from '../../../composables';

export const createDigitalStampRangeField = (
  refs: ShipmentOptionsRefs,
  order?: Plugin.ModelContextOrderDataContext,
): InteractiveElementConfiguration => {
  const pluginSettings = usePluginSettings();
  const fallbackOrderData = order ? undefined : toValue(useOrderData().order);
  const orderData = order ?? fallbackOrderData;

  const {initialWeight, manualWeight} = orderData?.physicalProperties ?? {};

  const totalWeight = Number(initialWeight) + Number(pluginSettings.order.emptyDigitalStampWeight ?? 0);

  const {ranges, currentRange} = useDigitalStampRanges(totalWeight, orderData);

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
