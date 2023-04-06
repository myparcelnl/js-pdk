<template>
  <span
    v-test="`ShipmentBarcode--${shipment.id}`"
    :class="[config?.cssUtilities?.whitespaceNoWrap, config?.cssUtilities?.displayFlex]">
    <PdkImage
      v-if="carrier"
      width="20"
      :alt="carrier?.human"
      :title="carrier?.human"
      :src="useAssetUrl(carrier?.meta.logo_svg)" />

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

<script setup lang="ts">
import {useAdminConfig, useLanguage, useShipmentData} from '../../composables';
import {useQueryStore} from '../../stores';

const props = defineProps<{shipmentId: number}>();

useQueryStore().registerShipmentQuery(props.shipmentId);

const {translate} = useLanguage();

const {useAssetUrl, carrier, shipment} = useShipmentData(props.shipmentId);
const config = useAdminConfig();
</script>
