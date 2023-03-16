<template>
  <PdkShipmentLabelWrapper
    :loading="loading"
    :class="config?.cssUtilities?.cursorDefault"
    @click.stop>
    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentBarcode :shipment="shipment" />

      <PdkDropdownButton
        :hide-text="true"
        size="xs"
        :class="config?.cssUtilities?.marginLAuto"
        :disabled="loading"
        :actions="actions" />
    </div>

    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentPackageType
        :shipment="shipment"
        :class="config?.cssUtilities?.flexGrow" />

      <div :class="config?.cssUtilities?.flexGrow">
        <ShipmentStatus :shipment="shipment" />
      </div>
    </div>
  </PdkShipmentLabelWrapper>
</template>

<script setup lang="ts">
import {useAdminConfig, useShipmentData} from '../../composables';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import {Shipment as ShipmentNamespace} from '@myparcel-pdk/common/src';
import ShipmentPackageType from '../common/ShipmentPackageType.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';

const props = defineProps<{shipment: ShipmentNamespace.ModelShipment}>();

const {loading, actions} = useShipmentData(props.shipment);
const config = useAdminConfig();
</script>
