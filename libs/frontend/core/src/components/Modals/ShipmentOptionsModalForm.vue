<template>
  <ShipmentOptionsForm
    v-if="order"
    :order="order" />
</template>

<script setup lang="ts">
import ShipmentOptionsForm from '../common/ShipmentOptionsForm.vue';
import {computed} from 'vue';
import {useFetchOrdersQuery} from '../../actions';
import {useModalStore} from '../../stores';

const modalStore = useModalStore();

const order = computed(() => {
  if (!modalStore.context) {
    return null;
  }

  const orderQuery = useFetchOrdersQuery(modalStore.context);

  if (!orderQuery.data.value) {
    return null;
  }

  return orderQuery.data.value;
});
</script>
