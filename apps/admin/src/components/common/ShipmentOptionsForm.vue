<template>
  <MagicForm
    v-test="$.type.__name"
    :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get, isDef} from '@vueuse/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {type OneOrMore} from '@myparcel/ts-utils';
import {createShipmentOptionsForm} from '../../forms';
import {useOrdersData} from '../../composables';

const props = defineProps<{order: OneOrMore<string>}>();

const shipmentOptionsForm = computed(() => {
  const queries = useOrdersData(props.order);

  return createShipmentOptionsForm(queries.map((data) => get(data.order)).filter(isDef));
});
</script>
