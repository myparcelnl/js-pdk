<template>
  <PdkDropdownButton :actions="actions" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {type AnyActionDefinition} from '../../types';
import {instantiateActions} from '../../services';
import {useOrderData} from '../../composables';
import {
  orderExportAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
} from '../../actions';

const {query} = useOrderData();

const actions = computed(() => {
  const actions: AnyActionDefinition[] = [];
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

  return instantiateActions(actions, {orderIds: order?.externalIdentifier, form: false});
});
</script>
