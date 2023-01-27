<template>
  <PdkShipmentLabelWrapper :loading="loading">
    <PdkRow collapse-gutters>
      <PdkCol>
        <ShipmentBarcode :shipment="shipment" />
      </PdkCol>

      <PdkCol>
        <PdkDropdownButton
          :hide-text="true"
          :disabled="loading"
          :actions="actions" />
      </PdkCol>
    </PdkRow>

    <PdkRow collapse-gutters>
      <PdkCol span="2">
        <ShipmentStatus :shipment="shipment" />
      </PdkCol>
    </PdkRow>
  </PdkShipmentLabelWrapper>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Shipment} from '@myparcel-pdk/common';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useShipmentData} from '../../composables';

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
    return useShipmentData(props.shipment);
  },
});
</script>
