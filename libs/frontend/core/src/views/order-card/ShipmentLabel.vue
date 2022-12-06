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
    </PdkTableCol>

    <PdkTableCol>
      <PdkLink
        v-if="shipment.barcode"
        :href="shipment.barcode">
        {{ shipment.barcode }}
        <PdkIcon icon="external" />
      </PdkLink>

      <span
        v-else
        v-text="translate('no_barcode')"></span>
    </PdkTableCol>

    <PdkTableCol>{{ shipment.status }}</PdkTableCol>
    <PdkTableCol>{{ formatter.formatRelative(shipment.updated) }}</PdkTableCol>
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
  useDateFormatter,
  useTranslate,
} from '../../';
import {Shipment} from '@myparcel-pdk/frontend-shared';
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
      carrier: computed(() => {
        const query = useCarriers(props.shipment.carrier.name);

        return query.data.value;
      }),

      dropdownActions: [shipmentPrintAction, shipmentRefreshAction, shipmentCreateReturnAction, deleteAction],

      formatter: useDateFormatter(),
      model: useVModel(props, 'modelValue', ctx.emit),
      query,
      translate: useTranslate(),
      useAssetUrl: useAssetUrl,
    };
  },
});
</script>
