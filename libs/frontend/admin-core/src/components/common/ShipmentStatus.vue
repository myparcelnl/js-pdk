<template>
  <span
    v-if="query.data.status"
    v-test="`shipment__status--${query.data.id}`"
    :title="translate('shipment_status')"
    v-text="translate(`shipment_status_${query.data.status}`)" />
</template>

<script setup lang="ts">
import {useLanguage} from '../../composables';
import {useQueryStore} from '../../stores';

const props = defineProps<{shipmentId: number}>();

const query = useQueryStore().registerShipmentQuery(props.shipmentId);

const {translate} = useLanguage();
</script>
