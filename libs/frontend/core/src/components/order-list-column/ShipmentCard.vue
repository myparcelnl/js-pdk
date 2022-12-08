<template>
  <PdkCard>
    <PdkImage
      v-if="carrier"
      width="20"
      :alt="carrier?.human"
      :title="carrier?.human"
      :src="useAssetUrl(carrier?.meta.logo_svg)" />

    <label
      v-if="shipment.status"
      v-text="shipment.status" />

    <PdkLink
      v-if="shipment.barcode"
      :href="shipment.linkConsumerPortal">
      {{ shipment.barcode }}
    </PdkLink>

    <span v-else>{{ shipment.id }}</span>

    <PdkLink
      v-for="action in actions"
      :key="`${shipment.id}_${action.id}`"
      hide-text
      :action="action" />
  </PdkCard>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {shipmentPrintAction, shipmentRefreshAction} from '../../data';
import {useAssetUrl, useTranslate} from '../../composables';
import {Shipment} from '@myparcel-pdk/common';
import {createActions} from '../../services';
import {useCarriers} from '../../sdk';

export default defineComponent({
  name: 'ShipmentCard',

  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: (props) => {
    const carriersQuery = useCarriers(props.shipment.carrier?.name);

    return {
      carrier: carriersQuery.data,
      useAssetUrl,
      actions: createActions([shipmentPrintAction, shipmentRefreshAction], {shipmentIds: [props.shipment.id]}),
      translate: useTranslate(),
    };
  },
});
</script>
