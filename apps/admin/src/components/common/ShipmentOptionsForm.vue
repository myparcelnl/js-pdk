<template>
  <MagicForm
    v-test="$.type.__name"
    :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {get, isDef} from '@vueuse/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {createShipmentOptionsForm} from '../../forms';
import {useOrdersData} from '../../composables';

const queries = useOrdersData();

const shipmentOptionsForm = createShipmentOptionsForm(queries.map((data) => get(data.order)).filter(isDef));
</script>
