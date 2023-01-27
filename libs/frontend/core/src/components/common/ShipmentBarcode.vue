<template>
  <span :class="config?.cssUtilities?.whitespaceNoWrap">
    <PdkImage
      v-if="carrier"
      width="20"
      :alt="carrier?.human"
      :title="carrier?.human"
      :src="useAssetUrl(carrier?.meta.logo_svg)" />

    <PdkLink
      v-if="shipment.barcode && shipment.linkConsumerPortal"
      :title="translate('shipment_barcode')"
      :href="shipment.linkConsumerPortal">
      {{ shipment.barcode }}
    </PdkLink>

    <span
      v-else
      :title="translate('shipment_barcode')"
      v-text="shipment.barcode ?? translate('shipment_no_barcode')"></span>
  </span>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useLanguage, useShipmentData} from '../../composables';
import {Shipment} from '@myparcel-pdk/common';

export default defineComponent({
  name: 'ShipmentBarcode',

  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: (props) => {
    const {translate} = useLanguage();

    return {
      ...useShipmentData(props.shipment),
      translate,
    };
  },
});
</script>
