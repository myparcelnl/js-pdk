<template>
  <span
    v-test="`ShipmentBarcode--${shipment.id}`"
    :class="[config?.cssUtilities?.whitespaceNoWrap, config?.cssUtilities?.displayFlex]">
    <PdkImage
      v-if="carrier"
      :alt="carrier?.human"
      :src="useAssetUrl(carrier?.meta.logo_svg)"
      :title="carrier?.human"
      width="20" />

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
import {useQueryStore} from '../../stores';
import {useAdminConfig, useLanguage, useShipmentData} from '../../composables';

const props = defineProps<{shipmentId: number}>();

useQueryStore().registerShipmentQuery(props.shipmentId);

const {translate} = useLanguage();

const {useAssetUrl, carrier, shipment} = useShipmentData(props.shipmentId);
const config = useAdminConfig();
</script>
