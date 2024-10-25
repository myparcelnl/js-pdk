<template>
  <PdkShipmentLabelWrapper
    v-test="[$.type.__name, shipmentId]"
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
      <DeliveryOptionsPackageType
        :class="config?.cssUtilities?.flexGrow"
        :shipment-or-order="data" />

      <div :class="config?.cssUtilities?.flexGrow">
        <ShipmentStatus :shipment-id="shipmentId" />
      </div>
    </div>
  </PdkShipmentLabelWrapper>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {DeliveryOptionsPackageType, ShipmentBarcode, ShipmentStatus} from '../common';
import {useQueryStore} from '../../stores/useQueryStore';
import {useShipmentData} from '../../composables/shipments/useShipmentData';
import {useAdminConfig} from '../../composables/useAdminConfig';

const props = defineProps<{shipmentId: number}>();

const {shipmentId} = toRefs(props);

useQueryStore().registerShipmentQueries(shipmentId);

const {loading, actions, shipment: data} = useShipmentData(shipmentId);
const config = useAdminConfig();
</script>
