<template>
  <OrderListItem />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import OrderListItem from '../OrderListItem.vue';
import {extendAdminInstance} from '../../utils';

const props = defineProps({
  orderIdentifier: {
    type: String,
    required: true,
  },
});

const propRefs = toRefs(props);

extendAdminInstance({context: {orderIdentifier: propRefs.orderIdentifier?.value}});
</script>
