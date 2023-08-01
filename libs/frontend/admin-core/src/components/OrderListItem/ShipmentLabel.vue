<template>
  <PdkShipmentLabelWrapper
    :class="config?.cssUtilities?.cursorDefault"
    :loading="loading"
    @click.stop>
    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentBarcode :shipment-id="shipmentId" />

      <PdkDropdownButton
        :actions="actions"
        :class="config?.cssUtilities?.marginLAuto"
        :disabled="loading"
        :hide-text="true"
        size="xs" />
    </div>

    <div :class="config?.cssUtilities?.displayFlex">
      <ShipmentPackageType
        :class="config?.cssUtilities?.flexGrow"
        :shipment-id="shipmentId" />

      <div :class="config?.cssUtilities?.flexGrow">
        <ShipmentStatus :shipment-id="shipmentId" />
      </div>
    </div>
  </PdkShipmentLabelWrapper>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import ShipmentPackageType from '../common/ShipmentPackageType.vue';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import {useQueryStore} from '../../stores';
import {useAdminConfig, useShipmentData} from '../../composables';

const props = defineProps<{shipmentId: number}>();

const {shipmentId} = toRefs(props);

useQueryStore().registerShipmentQueries(shipmentId);

const {loading, actions} = useShipmentData(shipmentId);
const config = useAdminConfig();
</script>
