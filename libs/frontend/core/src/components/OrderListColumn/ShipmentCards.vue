<template>
  <TransitionGroup
    appear
    :name="pdkConfig?.transitions?.shipmentCard">
    <ShipmentCard
      v-for="shipment in order.shipments ?? []"
      :key="`${order?.externalIdentifier}_${shipment.id}`"
      :shipment="shipment" />
  </TransitionGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentCard from './ShipmentCard.vue';
import {usePdkConfig} from '../../composables';

export default defineComponent({
  name: 'ShipmentCards',
  components: {ShipmentCard},

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: () => {
    return {
      pdkConfig: usePdkConfig(),
    };
  },
});
</script>
