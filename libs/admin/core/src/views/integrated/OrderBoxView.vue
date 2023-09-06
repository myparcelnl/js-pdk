<template>
  <OrderBox />
</template>

<script lang="ts" setup>
import OrderBox from '../OrderBox.vue';
import {extendAdminInstance} from '../../composables';

const props = defineProps({
  orderIdentifier: {
    type: String,
    required: true,
  },
});

extendAdminInstance({context: {orderIdentifier: props.orderIdentifier}});
</script>
