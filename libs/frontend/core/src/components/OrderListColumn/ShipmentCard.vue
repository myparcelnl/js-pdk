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

      <PdkCol>
        <PdkButtonGroup>
          <ActionButton
            v-for="action in actions"
            :key="`${shipment.id}_${action.id}`"
            :action="action"
            hide-text />
        </PdkButtonGroup>
      </PdkCol>
    </PdkRow>
  </PdkOrderCardShipmentsWrapper>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import ActionButton from '../common/ActionButton.vue';
import {Shipment} from '@myparcel-pdk/common';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useShipmentCardData} from '../../composables';

export default defineComponent({
  name: 'ShipmentCard',
  components: {
    ActionButton,
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
