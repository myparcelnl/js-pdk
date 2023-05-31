<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {get, isDef} from '@vueuse/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {createShipmentOptionsForm} from '../../forms';
import {useOrders} from '../../composables';

const queries = useOrders();

const shipmentOptionsForm = createShipmentOptionsForm(queries.map((query) => get(query.data)).filter(isDef));
</script>
