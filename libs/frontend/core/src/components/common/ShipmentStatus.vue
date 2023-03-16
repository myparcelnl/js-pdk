<template>
  <span
    v-if="shipment.status"
    v-test="`shipment__status--${shipment.id}`"
    :title="translate('shipment_status')"
    v-text="translate(`shipment_status_${shipment.status}`)" />
</template>

<script setup lang="ts">
import {Shipment} from '@myparcel-pdk/common/src';
import {useLanguage} from '../../composables';

defineProps<{shipment: Shipment.ModelShipment}>();

const {translate} = useLanguage();
</script>
