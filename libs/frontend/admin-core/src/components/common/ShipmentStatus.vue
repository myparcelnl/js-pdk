<template>
  <span
    v-if="data?.status"
    v-test="`shipment__status--${data.id}`"
    :title="translate('shipment_status')"
    v-text="translate(`shipment_status_${data.status}`)" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {useQueryStore} from '../../stores';
import {useLanguage} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const queryStore = useQueryStore();

const query = queryStore.registerShipmentQuery(props.shipmentId);

const data = computed(() => get(query.data));

const {translate} = useLanguage();
</script>
