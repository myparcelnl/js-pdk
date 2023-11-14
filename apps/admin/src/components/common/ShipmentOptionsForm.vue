<template>
  <MagicForm
    v-test="$.type.__name"
    :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {get, isDef} from '@vueuse/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {type OneOrMore} from '@myparcel/ts-utils';
import {createShipmentOptionsForm} from '../../forms';
import {useOrdersData} from '../../composables';

const props = defineProps<{order: OneOrMore<string>}>();

const propRefs = toRefs(props);

const queries = useOrdersData(propRefs.order.value);

const shipmentOptionsForm = createShipmentOptionsForm(queries.map((data) => get(data.order)).filter(isDef));
</script>
