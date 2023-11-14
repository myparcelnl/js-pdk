<template>
  <ShipmentOptionsForm
    v-if="orderIds.length"
    v-test="$.type.__name"
    :order="orderIds" />
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {type OneOrMore} from '@myparcel/ts-utils';
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {useOrdersData} from '../../composables';

const props = defineProps<{order: OneOrMore<string>}>();

const orderIds = computed(() => {
  return useOrdersData(props.order)
    .filter((data) => get(data.order))
    .map((data) => get(data.order)?.externalIdentifier);
});
</script>
