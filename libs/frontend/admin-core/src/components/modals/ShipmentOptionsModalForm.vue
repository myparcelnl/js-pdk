<template>
  <ShipmentOptionsForm v-if="queries.some((data) => data.order)" />
</template>

<script setup lang="ts">
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {useOrdersData} from '../../composables';

const queries = useOrdersData();
</script>
