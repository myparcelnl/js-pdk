<template>
  <PdkDropdownButton :actions="actions" />
</template>

<script setup lang="ts">
import {
  orderExportAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
} from '../../actions';
import {AnyAdminAction} from '../../types';
import {computed} from 'vue';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';
import {useOrder} from '../../composables';

const query = useOrder();

const actions = computed(() => {
  const actions: AnyAdminAction[] = [];

  if (get(query.data)?.shipments?.some((item) => !item.deleted)) {
    actions.push(orderExportAction);
    actions.push({...ordersPrintAction, standalone: true});
    actions.push(ordersEditAction, ordersFetchAction);
  } else {
    actions.push({...orderExportAction, standalone: true});
    actions.push(ordersExportPrintShipmentsAction, ordersEditAction);
  }

  return defineActions(actions, {orderIds: get(query.data)?.externalIdentifier, form: false});
});
</script>
