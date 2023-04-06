<template>
  <PdkShipmentLabelWrapper
    :loading="loading"
    :class="config?.cssUtilities?.cursorDefault"
    @click.stop>
    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentBarcode :shipment-id="shipmentId" />

      <PdkDropdownButton
        :hide-text="true"
        size="xs"
        :class="config?.cssUtilities?.marginLAuto"
        :disabled="loading"
        :actions="actions" />
    </div>

    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentPackageType
        :shipment-id="shipmentId"
        :class="config?.cssUtilities?.flexGrow" />

      <div :class="config?.cssUtilities?.flexGrow">
        <ShipmentStatus :shipment-id="shipmentId" />
      </div>
    </div>
  </PdkShipmentLabelWrapper>
</template>

<script setup lang="ts">
import {useAdminConfig, useShipmentData} from '../../composables';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentPackageType from '../common/ShipmentPackageType.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useQueryStore} from '../../stores';

const props = defineProps<{shipmentId: number}>();

useQueryStore().registerShipmentQuery(props.shipmentId);

const {loading, actions} = useShipmentData(props.shipmentId);
const config = useAdminConfig();
</script>
