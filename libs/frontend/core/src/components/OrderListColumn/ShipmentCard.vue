<template>
  <PdkOrderCardShipmentsWrapper :loading="loading">
    <PdkRow collapse-gutters>
      <PdkCol>
        <ShipmentBarcode :shipment="shipment" />
      </PdkCol>
    </PdkRow>

    <PdkRow collapse-gutters>
      <PdkCol>
        <ShipmentStatus :shipment="shipment" />
      </PdkCol>
    </PdkRow>

    <PdkRow collapse-gutters>
      <PdkCol
        v-for="action in actions"
        :key="`${shipment.id}_${action.id}`">
        <PdkLink
          hide-text
          :action="action" />
      </PdkCol>
    </PdkRow>
  </PdkOrderCardShipmentsWrapper>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Shipment} from '@myparcel-pdk/common';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useShipmentCardData} from '../../composables';

export default defineComponent({
  name: 'ShipmentCard',
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
    return useShipmentCardData(props.shipment);
  },
});
</script>
