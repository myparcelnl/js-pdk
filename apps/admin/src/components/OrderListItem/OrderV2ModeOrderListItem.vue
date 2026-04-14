<template>
  <DeliveryOptionsExcerpt v-if="shipments.length === 0" />

  <ShipmentLabel
    v-for="shipment in data?.shipments ?? []"
    :key="`${data?.externalIdentifier}_${shipment.id}`"
    :shipment-id="shipment.id" />

  <PdkButtonGroup v-test="[$.type.__name, order?.externalIdentifier]">
    <ActionButton
      v-for="action in orderActions"
      :key="action.id"
      :action="action"
      :size="Size.Small"
      hide-text />
  </PdkButtonGroup>
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {Size} from '@myparcel-dev/pdk-common';
import {ActionButton, DeliveryOptionsExcerpt} from '../common';
import {instantiateActions} from '../../services';
import {useOrderData} from '../../composables';
import {ordersEditAction} from '../../actions';
import ShipmentLabel from './ShipmentLabel.vue';

const {query, order} = useOrderData();

const data = computed(() => toValue(query.data));

const shipments = computed(() => toValue(data)?.shipments ?? []);

const orderActions = instantiateActions([ordersEditAction], {
  orderIds: order.value?.externalIdentifier,
});
</script>
