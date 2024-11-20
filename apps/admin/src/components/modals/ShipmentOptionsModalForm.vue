<template>
  <ShipmentOptionsForm
    v-if="orderIds.length"
    v-test="$.type.__name"
    :order="orderIds" />
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {type OneOrMore} from '@myparcel/ts-utils';
import {ShipmentOptionsForm} from '../common';
import {useOrdersData} from '../../composables';

const props = defineProps<{order: OneOrMore<string>}>();

const orderIds = computed(() => {
  return useOrdersData(props.order)
    .filter((data) => toValue(data.order))
    .map((data) => toValue(data.order)?.externalIdentifier);
});
</script>
