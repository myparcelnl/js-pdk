<template>
  <OrderBox />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import OrderBox from '../OrderBox.vue';
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
