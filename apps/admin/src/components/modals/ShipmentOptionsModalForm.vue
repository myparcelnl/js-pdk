<template>
  <ShipmentOptionsForm
    v-if="orderIds.length"
    v-test="$.type.__name"
    :order="orderIds" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {type OneOrMore} from '@myparcel/ts-utils';
import {ShipmentOptionsForm} from '../common';
import {useOrdersData} from '../../composables/orders/useOrdersData';

const props = defineProps<{order: OneOrMore<string>}>();

const orderIds = computed(() => {
  return useOrdersData(props.order)
    .filter((data) => get(data.order))
    .map((data) => get(data.order)?.externalIdentifier);
});
</script>
