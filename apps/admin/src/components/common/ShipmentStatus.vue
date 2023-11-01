<template>
  <span
    v-if="data?.status"
    v-test="[$.type.__name, shipmentId]"
    :title="translate('shipment_status')"
    v-text="translate(`shipment_status_${data.status}`)" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useQueryStore} from '../../stores';
import {useLanguage, useShipmentData} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const {shipmentId} = toRefs(props);

useQueryStore().registerShipmentQueries(shipmentId);

const {shipment: data} = useShipmentData(shipmentId);

const {translate} = useLanguage();
</script>
