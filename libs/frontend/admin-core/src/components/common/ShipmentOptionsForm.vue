<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script setup lang="ts">
import {MagicForm} from '@myparcel/vue-form-builder/src';
import {createShipmentOptionsForm} from '../../forms';
import {get} from '@vueuse/core';
import {useOrders} from '../../composables';

const queries = useOrders();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const shipmentOptionsForm = createShipmentOptionsForm(queries.map((query) => get(query.data)!));
</script>
