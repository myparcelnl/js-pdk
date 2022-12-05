<template>
  <div class="card p-1">
    <label v-text="shipment.status" />
    <div class="align-items-center d-flex text-nowrap">
      <a
        :href="shipment.barcode"
        rel="noopener noreferrer"
        target="_blank"
        v-text="shipment.barcode ?? translate('error_missing_barcode')" />
      <a
        class="btn btn-link"
        @click="() => print(shipment.id)">
        <PdkIcon icon="print" />
      </a>
      <a
        class="btn btn-link"
        @click="() => refresh(shipment.id)">
        <PdkIcon icon="refresh" />
      </a>
    </div>
    <!--    <LoaderOverlay v-show="loading" /> -->
  </div>
</template>

<script lang="ts">
import {PdkAction, useTranslate} from '../../';
import {PropType, defineComponent} from 'vue';
import {Shipment} from '@myparcel-pdk/common';

export default defineComponent({
  name: 'LabelCard',

  props: {
    shipment: {
      type: Object as PropType<Shipment.ModelShipment>,
      required: true,
    },
  },

  setup: () => {
    const execute = async (action: PdkAction, shipmentId: number): Promise<void> => {
      // await executeLabelAction(action, Number(label.id_label));
    };

    return {
      print: async (shipmentId: number): Promise<void> => execute(PdkAction.SHIPMENT_PRINT, shipmentId),
      refresh: async (shipmentId: number): Promise<void> => execute(PdkAction.SHIPMENT_REFRESH, shipmentId),
      translate: useTranslate(),
    };
  },
});
</script>
