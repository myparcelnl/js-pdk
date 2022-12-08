<template>
  <ShipmentOptionsForm :order-id="orderId" />
</template>

<script setup lang="ts">
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {useQueryStore} from '../../stores';

const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
});

const queryStore = useQueryStore();

queryStore.registerOrderQueries(props.orderId);
</script>
