<template>
  <OrderListItem />
</template>

<script lang="ts" setup>
import OrderListItem from '../OrderListItem.vue';
import {extendAdminInstance} from '../../composables';

const props = defineProps({
  orderIdentifier: {
    type: String,
    required: true,
  },
});

extendAdminInstance({context: {orderIdentifier: props.orderIdentifier}});
</script>
