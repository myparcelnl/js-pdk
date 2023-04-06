<template>
  <TransitionGroup
    :name="config?.transitions?.shipmentBox"
    appear>
    <ShipmentLabel
      v-for="shipment in query.data?.shipments ?? []"
      :key="`${query.data?.externalIdentifier}_${shipment.id}`"
      :shipment-id="shipment.id" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import {useAdminConfig, useOrder} from '../../composables';
import ShipmentLabel from './ShipmentLabel.vue';

const query = useOrder();
const config = useAdminConfig();
</script>
