<template>
  <div>
    <div>
      <MagicForm
        v-test="$.type.__name"
        :form="shipmentOptionsForm" />
    </div>

    <div>
      <pre v-text="values"></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get, isDef} from '@vueuse/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {createShipmentOptionsForm} from '../../forms';
import {useOrdersData} from '../../composables';

const queries = useOrdersData();

const shipmentOptionsForm = createShipmentOptionsForm(queries.map((data) => get(data.order)).filter(isDef));

const values = computed(() => shipmentOptionsForm.getValues());
</script>
