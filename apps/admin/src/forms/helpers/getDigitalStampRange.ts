import {get as vuGet} from '@vueuse/core';
import {type Plugin} from '@myparcel-pdk/common';
import {useOrderData, usePluginSettings} from '../../composables';

export const getDigitalStampRange = (): {min: number; max: number; average: number} => {
  const pluginSettings = usePluginSettings();
  const {order} = useOrderData();

  const orderData = vuGet(order);

  const {digitalStampRanges} = orderData;
  const {initialWeight} = orderData?.physicalProperties ?? {};

  const totalWeight = Number(initialWeight) + Number(pluginSettings.order.emptyDigitalStampWeight ?? 0);

  const ranges: Plugin.ModelContextOrderDataContext['digitalStampRanges'] = digitalStampRanges ?? [];

  return (
    ranges.find((range) => {
      return range.min <= totalWeight && range.max >= totalWeight;
    }) ?? ranges[0]
  );
};
