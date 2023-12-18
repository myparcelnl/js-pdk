<template>
  <span
    v-if="resolved.deliveryOptions?.packageType"
    v-test="[$.type.__name, resolved.deliveryOptions.packageType]">
    <PdkIcon :icon="resolved.deliveryOptions.packageType" />

    <span
      :title="translate(getPackageTypeTranslation())"
      v-text="translate(getPackageTypeTranslation(resolved.deliveryOptions.packageType))" />

    <DigitalStampWeightRange
      v-if="resolved.deliveryOptions?.packageType === PackageTypeName.DigitalStamp"
      :weight="weight" />
  </span>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get, type MaybeRef} from '@vueuse/core';
import {type Shipment} from '@myparcel-pdk/common';
import {type Plugin} from '@myparcel-pdk/admin';
import {isOfType} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';
import {getPackageTypeTranslation} from '../../utils';
import {useLanguage} from '../../composables';
import DigitalStampWeightRange from './DigitalStampWeightRange.vue';

const props = defineProps<{shipmentOrOrder: MaybeRef<Shipment.ModelShipment | Plugin.ModelPdkOrder>}>();

const {translate} = useLanguage();

const resolved = computed(() => get(props.shipmentOrOrder));

const weight = computed(() => {
  return isOfType<Shipment.ModelPhysicalProperties>(resolved.value.physicalProperties, 'weight')
    ? resolved.value.physicalProperties.weight
    : resolved.value.physicalProperties?.totalWeight ?? 0;
});
</script>
