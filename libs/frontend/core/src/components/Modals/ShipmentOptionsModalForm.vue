<template>
  <ShipmentOptionsForm v-if="queries.some((query) => query.data)" />
</template>

<script setup lang="ts">
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {useOrders} from '../../composables/useOrder';

const queries = useOrders();
</script>
