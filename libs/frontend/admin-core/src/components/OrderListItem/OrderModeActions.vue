<template>
  <PdkButtonGroup>
    <template v-if="data?.exported">
      <PdkLink :action="showExportedOrderAction" />
    </template>

    <template v-else>
      <ActionButton
        v-for="action in orderActions"
        :key="action.id"
        :action="action"
        hide-text />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {ActionButton} from '../common';
import {instantiateAction, instantiateActions} from '../../services';
import {useOrder} from '../../composables';
import {orderExportAction, ordersEditAction, orderViewInBackofficeAction} from '../../actions';

const query = useOrder();

const data = computed(() => get(query.data));

const showExportedOrderAction = instantiateAction(orderViewInBackofficeAction);

const orderActions = instantiateActions([ordersEditAction, orderExportAction], {
  orderIds: data.value?.externalIdentifier,
});
</script>
