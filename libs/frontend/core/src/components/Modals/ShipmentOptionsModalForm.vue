<template>
  <ShipmentOptionsForm
    v-if="order"
    :order="order" />
</template>

<script setup lang="ts">
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {computed} from 'vue';
import {useModalStore} from '../../stores';
import {useOrderQuery} from '../../actions';

const modalStore = useModalStore();

const order = computed(() => {
  if (!modalStore.context) {
    return null;
  }

  const orderQuery = useOrderQuery(modalStore.context);

  if (!orderQuery.data.value) {
    return null;
  }

  return orderQuery.data.value;
});
</script>
