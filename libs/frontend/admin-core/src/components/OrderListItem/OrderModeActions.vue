<template>
  <PdkButtonGroup v-test="'OrderModeActions'">
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
import {defineActions} from '../../services';
import {useOrder} from '../../composables';
import {orderExportAction, orderViewInBackofficeAction, ordersEditAction} from '../../actions';

const query = useOrder();

const data = computed(() => get(query.data));

const showExportedOrderAction = defineActions(orderViewInBackofficeAction);

const orderActions = defineActions([ordersEditAction, orderExportAction], {
  orderIds: data.value?.externalIdentifier,
});
</script>
