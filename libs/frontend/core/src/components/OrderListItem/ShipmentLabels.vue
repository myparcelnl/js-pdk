<template>
  <TransitionGroup
    :name="pdkConfig?.transitions?.shipmentBox"
    appear>
    <ShipmentLabel
      v-for="shipment in order.shipments.filter((item) => !item.deleted)"
      :key="`${order?.externalIdentifier}_${shipment.id}`"
      :shipment="shipment" />
  </TransitionGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Plugin} from '@myparcel-pdk/common/src';
import ShipmentLabel from './ShipmentLabel.vue';
import {usePdkConfig} from '../../composables';

export default defineComponent({
  name: 'ShipmentLabels',
  components: {ShipmentLabel},

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
