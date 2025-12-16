<template>
  <DeliveryOptionsExcerpt v-if="shipments.length === 0" />

  <ShipmentLabel
    v-for="shipment in data?.shipments ?? []"
    :key="`${data?.externalIdentifier}_${shipment.id}`"
    :shipment-id="shipment.id" />

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
import {computed, toValue} from 'vue';
import {Size} from '@myparcel-dev/pdk-common';
import {ActionButton, DeliveryOptionsExcerpt} from '../common';
import {instantiateAction, instantiateActions} from '../../services';
import {useOrderData} from '../../composables';
import {orderExportAction, ordersEditAction, orderViewInBackofficeAction} from '../../actions';
import ShipmentLabel from './ShipmentLabel.vue';

const {query, order} = useOrderData();

const data = computed(() => toValue(query.data));

const shipments = computed(() => toValue(data)?.shipments ?? []);

const showExportedOrderAction = instantiateAction(orderViewInBackofficeAction);

const orderActions = instantiateActions([ordersEditAction, orderExportAction], {
  orderIds: order.value?.externalIdentifier,
});
</script>
