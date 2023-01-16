<template>
  <PdkImage
    v-if="carrier"
    width="20"
    :alt="carrier?.human"
    :title="carrier?.human"
    :src="useAssetUrl(carrier?.meta.logo_svg)" />

  <PdkLink
    v-if="shipment.barcode && shipment.linkConsumerPortal"
    :class="config?.cssUtilities?.whitespaceNoWrap"
    :title="translate('shipment_barcode')"
    :href="shipment.linkConsumerPortal">
    {{ shipment.barcode }}
  </PdkLink>

  <span
    v-else
    :class="config?.cssUtilities?.whitespaceNoWrap"
    :title="translate('shipment_barcode')"
    v-text="shipment.barcode ?? translate('shipment_no_barcode')">
  </span>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useAssetUrl, useLanguage, usePdkConfig} from '../../composables';
import {Shipment} from '@myparcel-pdk/common';
import {useCarriers} from '../../sdk';

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
    const carriersQuery = useCarriers(props.shipment.carrier?.name);

    return {
      carrier: carriersQuery.data,
      config: usePdkConfig(),
      translate,
      useAssetUrl,
    };
  },
});
</script>
