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
        :action="action"
        :size="Size.Small"
        hide-text />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts" setup>
import {Size} from '@myparcel-pdk/common';
import {ActionButton, DeliveryOptionsExcerpt} from '../common';
import {instantiateAction} from '../../services/instantiateAction';
import {instantiateActions} from '../../services/instantiateActions';
import {useOrderData} from '../../composables/orders/useOrderData';
import {orderExportAction, ordersEditAction, orderViewInBackofficeAction} from '../../actions/definitions/orders';

const {order} = useOrderData();

const showExportedOrderAction = instantiateAction(orderViewInBackofficeAction);

const orderActions = instantiateActions([ordersEditAction, orderExportAction], {
  orderIds: order.value?.externalIdentifier,
});
</script>
