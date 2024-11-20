<template>
  <span
    v-if="shipmentOrOrder.deliveryOptions?.packageType"
    v-test="[$.type.__name, shipmentOrOrder.deliveryOptions.packageType]">
    <PackageType :package-type="shipmentOrOrder.deliveryOptions.packageType" />

    <DigitalStampWeightRange
      v-if="weight && shipmentOrOrder.deliveryOptions.packageType === PackageTypeName.DigitalStamp"
      :weight="weight" />
  </span>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {type Plugin, type Shipment} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';
import PackageType from './PackageType.vue';
import DigitalStampWeightRange from './DigitalStampWeightRange.vue';

const props = defineProps<{shipmentOrOrder: Shipment.ModelShipment | Plugin.ModelPdkOrder}>();

const weight = computed(() => {
  const {physicalProperties} = props.shipmentOrOrder;

  return isOfType<Shipment.ModelPhysicalProperties>(physicalProperties, 'weight')
    ? physicalProperties.weight
    : physicalProperties?.totalWeight;
});
</script>
