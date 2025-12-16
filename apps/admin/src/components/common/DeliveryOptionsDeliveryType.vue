<template>
  <span
    v-if="deliveryOptions.deliveryType"
    v-test="[$.type.__name, deliveryOptions.deliveryType]">
    <PdkIcon :icon="deliveryOptions.deliveryType" />

    <span
      :title="translate(getDeliveryTypeTranslation())"
      v-text="translate(getDeliveryTypeTranslation(deliveryOptions.deliveryType))" />
  </span>
</template>

<script lang="ts" setup>
import {type Shipment} from '@myparcel-dev/pdk-common';
import {getDeliveryTypeTranslation} from '../../utils';
import {useLanguage} from '../../composables';

defineProps<{
  deliveryOptions: Shipment.ModelDeliveryOptions;
}>();

const {translate} = useLanguage();
</script>
