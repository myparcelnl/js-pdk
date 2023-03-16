<template>
  <div v-if="shipment.deliveryOptions.packageType">
    <PdkIcon :icon="shipment.deliveryOptions.packageType" />

    <span
      :title="translate('package_type')"
      v-text="translate(getPackageTypeTranslation(shipment.deliveryOptions.packageType))" />
  </div>
</template>

<script setup lang="ts">
import {Shipment as ShipmentNamespace} from '@myparcel-pdk/common/src';
import {getPackageTypeTranslation} from '../../helpers';
import {useLanguage} from '../../composables';

defineProps<{shipment: ShipmentNamespace.ModelShipment}>();

const {translate} = useLanguage();
</script>
