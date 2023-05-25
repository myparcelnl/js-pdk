<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {get} from '@vueuse/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {createShipmentOptionsForm} from '../../forms';
import {useOrders} from '../../composables';

const queries = useOrders();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const shipmentOptionsForm = createShipmentOptionsForm(queries.map((query) => get(query.data)).filter(Boolean));
</script>
