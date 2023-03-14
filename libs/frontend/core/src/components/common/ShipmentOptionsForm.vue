<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script setup lang="ts">
import {MagicForm} from '@myparcel/vue-form-builder/src';
import {createShipmentOptionsForm} from '../../forms';
import {get} from '@vueuse/core';
import {markRaw} from 'vue';
import {useOrder} from '../../composables/useOrder';

const query = useOrder();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const shipmentOptionsForm = createShipmentOptionsForm(markRaw(get(query.data)!));
</script>
