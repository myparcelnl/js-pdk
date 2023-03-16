<template>
  <span
    v-if="query.data.status"
    v-test="`shipment__status--${query.data.id}`"
    :title="translate('shipment_status')"
    v-text="translate(`shipment_status_${query.data.status}`)" />
</template>

<script setup lang="ts">
import {useLanguage, useShipment} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const {translate} = useLanguage();

const query = useShipment(props.shipmentId);
</script>
