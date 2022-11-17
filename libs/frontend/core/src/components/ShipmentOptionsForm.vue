<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder';
import {shipmentOptionsForm} from '../pdk';
</script>
