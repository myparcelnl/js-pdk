<template>
  <DeliveryOptionsExcerpt />

  <PdkButtonGroup v-test="[$.type.__name, order?.externalIdentifier]">
    <template v-if="order?.exported">
      <PdkLink :action="showExportedOrderAction" />
    </template>

    <template v-else>
      <ActionButton
        v-for="action in orderActions"
        :key="action.id"
        :size="Size.Small"
        :action="action"
        hide-text />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts" setup>
import {Size} from '@myparcel-pdk/common';
import DeliveryOptionsExcerpt from '../common/DeliveryOptionsExcerpt.vue';
import {ActionButton} from '../common';
import {instantiateAction, instantiateActions} from '../../services';
import {useOrderData} from '../../composables';
import {orderExportAction, ordersEditAction, orderViewInBackofficeAction} from '../../actions';

const {order} = useOrderData();

const showExportedOrderAction = instantiateAction(orderViewInBackofficeAction);

const orderActions = instantiateActions([ordersEditAction, orderExportAction], {
  orderIds: order.value?.externalIdentifier,
});
</script>
