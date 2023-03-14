<template>
  <TransitionGroup
    :name="config?.transitions?.shipmentBox"
    appear>
    <ShipmentLabel
      v-for="shipment in query.data?.shipments.filter((item) => !item.deleted)"
      :key="`${query.data?.externalIdentifier}_${shipment.id}`"
      :shipment="shipment" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import ShipmentLabel from './ShipmentLabel.vue';
import {useAdminConfig} from '../../composables';
import {useOrder} from '../../composables/useOrder';

const query = useOrder();
const config = useAdminConfig();
</script>
