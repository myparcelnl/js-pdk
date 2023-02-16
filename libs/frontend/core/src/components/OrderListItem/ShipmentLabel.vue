<template>
  <PdkShipmentLabelWrapper :loading="loading">
    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentBarcode :shipment="shipment" />

      <PdkDropdownButton
        :hide-text="true"
        size="xs"
        :class="config?.cssUtilities?.marginLAuto"
        :disabled="loading"
        :actions="actions" />
    </div>

    <ShipmentStatus :shipment="shipment" />
  </PdkShipmentLabelWrapper>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useAdminConfig, useShipmentData} from '../../composables';
import {Shipment} from '@myparcel-pdk/common/src';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';

export default defineComponent({
  name: 'ShipmentLabel',
  components: {
    ShipmentStatus,
    ShipmentBarcode,
  },

  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: (props) => {
    return {
      ...useShipmentData(props.shipment),
      config: useAdminConfig(),
    };
  },
});
</script>
