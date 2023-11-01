<template>
  <span
    v-test="[$.type.__name, shipment.id]"
    :class="[config?.cssUtilities?.whitespaceNoWrap, config?.cssUtilities?.displayFlex]">
    <CarrierLogo
      v-if="carrier"
      :carrier="carrier" />

    <template v-if="carrier">&nbsp;</template>

    <PdkLink
      v-if="shipment.barcode && shipment.linkConsumerPortal"
      :alt="translate('shipment_barcode')"
      :href="shipment.linkConsumerPortal">
      {{ shipment.barcode }}
    </PdkLink>

    <span
      v-else
      :title="translate('shipment_barcode')"
      v-text="shipment.barcode || translate('shipment_no_barcode')"></span>
  </span>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useQueryStore} from '../../stores';
import {useAdminConfig, useLanguage, useShipmentData} from '../../composables';
import CarrierLogo from './CarrierLogo.vue';

const props = defineProps<{shipmentId: number}>();

const {shipmentId} = toRefs(props);

useQueryStore().registerShipmentQueries(shipmentId);

const {translate} = useLanguage();

const {carrier, shipment} = useShipmentData(shipmentId);
const config = useAdminConfig();
</script>
