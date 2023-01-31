<template>
  <TransitionGroup
    appear
    :name="pdkConfig?.transitions?.shipmentCard">
    <ShipmentLabel
      v-for="shipment in order.shipments.filter((item) => !item.deleted)"
      :key="`${order?.externalIdentifier}_${shipment.id}`"
      :shipment="shipment" />
  </TransitionGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useOrderData, usePdkConfig} from '../../composables';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentLabel from './ShipmentLabel.vue';

export default defineComponent({
  name: 'ShipmentLabels',
  components: {ShipmentLabel},

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const orderData = useOrderData(props.order);

    return {
      pdkConfig: usePdkConfig(),
    };
  },
});
</script>
