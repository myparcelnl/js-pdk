<template>
  <TransitionGroup
    :name="config?.transitions?.shipmentBox"
    appear>
    <ShipmentLabel
      v-for="shipment in shipments"
      :key="`${query.data?.externalIdentifier}_${shipment.id}`"
      :shipment-id="shipment.id" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import {useAdminConfig, useOrder, useOrderShipments} from '../../composables';
import ShipmentLabel from './ShipmentLabel.vue';

const query = useOrder();
const config = useAdminConfig();

const shipments = useOrderShipments(query);
</script>
