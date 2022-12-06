<template>
  <div class="card p-1">
    <label v-text="shipment.status" />
    <div class="align-items-center d-flex text-nowrap">
      <a
        :href="shipment.barcode"
        rel="noopener noreferrer"
        target="_blank"
        v-text="shipment.barcode ?? translate('no_barcode')" />

      <PdkLink :action="print" />
      <PdkLink :action="refresh" />
    </div>
    <!--    <LoaderOverlay v-show="loading" /> -->
  </div>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {shipmentPrintAction, shipmentRefreshAction, useTranslate} from '../../';
import {Shipment} from '@myparcel-pdk/frontend-shared';
import {createAction} from '../modals/createActions';

export default defineComponent({
  name: 'LabelCard',

  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: (props) => {
    return {
      print: createAction(shipmentPrintAction, {shipmentIds: props.shipment.id}),
      refresh: createAction(shipmentRefreshAction, {shipmentIds: props.shipment.id}),
      translate: useTranslate(),
    };
  },
});
</script>
