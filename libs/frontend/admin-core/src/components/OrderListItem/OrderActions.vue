<template>
  <PdkDropdownButton :actions="actions" />
</template>

<script lang="ts" setup>
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
  const order = get(query.data);

  if (order?.shipments?.some((item) => !item.deleted)) {
    actions.push(orderExportAction);
    actions.push({...ordersPrintAction, standalone: true});
    actions.push(ordersFetchAction);
  } else {
    actions.push({...orderExportAction, standalone: true});
    actions.push(ordersExportPrintShipmentsAction);
  }

  actions.push(ordersEditAction);

  return defineActions(actions, {orderIds: order?.externalIdentifier, form: false});
});
</script>
