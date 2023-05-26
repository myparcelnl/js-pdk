<template>
  <PdkDropdownButton :actions="actions" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {type AnyAdminAction} from '../../types';
import {defineActions} from '../../services';
import {useOrder} from '../../composables';
import {
  orderExportAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
} from '../../actions';

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
