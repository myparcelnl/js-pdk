<template>
  <span
    v-if="resolved.deliveryOptions?.packageType"
    v-test="[$.type.__name, resolved.deliveryOptions.packageType]">
    <PackageType :package-type="resolved.deliveryOptions.packageType" />

    <DigitalStampWeightRange
      v-if="weight && resolved.deliveryOptions.packageType === PackageTypeName.DigitalStamp"
      :weight="weight" />
  </span>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get, type MaybeRef} from '@vueuse/core';
import {type Plugin, type Shipment} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';
import PackageType from './PackageType.vue';
import DigitalStampWeightRange from './DigitalStampWeightRange.vue';

const props = defineProps<{shipmentOrOrder: MaybeRef<Shipment.ModelShipment | Plugin.ModelPdkOrder>}>();

const resolved = computed(() => get(props.shipmentOrOrder));

const weight = computed(() => {
  return isOfType<Shipment.ModelPhysicalProperties>(resolved.value.physicalProperties, 'weight')
    ? resolved.value.physicalProperties.weight
    : resolved.value.physicalProperties?.totalWeight;
});
</script>
