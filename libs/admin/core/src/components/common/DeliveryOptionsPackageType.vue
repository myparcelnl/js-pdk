<template>
  <span
    v-if="deliveryOptions.packageType"
    v-test="[$.type.__name, deliveryOptions.packageType]">
    <PdkIcon :icon="deliveryOptions.packageType" />

    <span
      :title="translate(getPackageTypeTranslation())"
      v-text="translate(getPackageTypeTranslation(deliveryOptions.packageType))" />
  </span>
</template>

<script lang="ts" setup>
import {type Shipment} from '@myparcel-pdk/common';
import {getPackageTypeTranslation} from '../../helpers';
import {useLanguage} from '../../composables';

defineProps<{
  deliveryOptions: Shipment.ModelDeliveryOptions;
}>();

const {translate} = useLanguage();
</script>
