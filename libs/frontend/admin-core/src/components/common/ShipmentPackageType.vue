<template>
  <div
    v-if="data?.deliveryOptions.packageType"
    v-test="[$.type.__name, shipmentId]">
    <PdkIcon :icon="data.deliveryOptions.packageType" />

    <span
      :title="translate('package_type')"
      v-text="translate(getPackageTypeTranslation(data.deliveryOptions.packageType))" />
  </div>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useQueryStore} from '../../stores';
import {getPackageTypeTranslation} from '../../helpers';
import {useLanguage, useShipmentData} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const {shipmentId} = toRefs(props);

useQueryStore().registerShipmentQueries(shipmentId);

const {shipment: data} = useShipmentData(shipmentId);

const {translate} = useLanguage();
</script>
