<template>
  <PdkTableRow>
    <PdkTableCol>
      <PdkCheckbox
        v-model="model"
        :value="shipment.id" />
    </PdkTableCol>
    <PdkTableCol>
      <PdkImage
        v-if="carrier"
        width="20"
        :alt="carrier?.human"
        :title="carrier?.human"
        :src="useAssetUrl(carrier?.meta.logo_svg)" />

      <a
        :href="shipment.barcode"
        rel="noopener noreferrer"
        target="_blank">
        {{ shipment.barcode }}
        <PdkIcon icon="external" />
      </a>
    </PdkTableCol>

    <PdkTableCol>{{ shipment.status }}</PdkTableCol>
    <PdkTableCol>{{ shipment.updated }}</PdkTableCol>
    <PdkTableCol align="right">
      <PdkDropdownButton :options="dropdownActions" />
    </PdkTableCol>
  </PdkTableRow>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {
  deleteAction,
  shipmentCreateReturnAction,
  shipmentPrintAction,
  shipmentRefreshAction,
  useAssetUrl,
  useCarriers,
} from '../../';
import {Shipment} from '@myparcel-pdk/common';
import {useQuery} from '@tanstack/vue-query';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'ShipmentLabel',

  props: {
    shipment: {
      type: Object as PropType<Required<Shipment.ModelShipment>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Array as PropType<number[]>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    const query = useQuery(['shipments', props.shipment.id], () => {
      return props.shipment;
    });

    return {
      query,
      useAssetUrl: useAssetUrl,
      carrier: computed(() => {
        const query = useCarriers(props.shipment.carrier.name);

        return query.data.value;
      }),

      model: useVModel(props, 'modelValue', ctx.emit),
      dropdownActions: [shipmentPrintAction, shipmentRefreshAction, shipmentCreateReturnAction, deleteAction],
    };
  },
});
</script>
