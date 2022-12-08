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
    <PdkTableCol>
      <span
        :title="shipment.updated"
        v-text="shipment.updated ? formatter.format('dateRelative', shipment.updated) : '—'" />
    </PdkTableCol>
    <PdkTableCol align="right">
      <PdkDropdownButton :actions="dropdownActions" />
    </PdkTableCol>
  </PdkTableRow>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Shipment, useFormatter} from '@myparcel-pdk/common';
import {deleteAction, shipmentCreateReturnAction, shipmentPrintAction, shipmentRefreshAction} from '../../data';
import {useAssetUrl, useTranslate} from '../../composables';
import {createActions} from '../../services';
import {useCarriers} from '../../sdk';
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
    const carriersQuery = useCarriers(props.shipment.carrier.name);

    return {
      carrier: carriersQuery.data,

      dropdownActions: createActions([
        {...shipmentPrintAction, standalone: true},
        shipmentRefreshAction,
        shipmentCreateReturnAction,
        deleteAction,
      ]),

      formatter: useFormatter(),
      model: useVModel(props, 'modelValue', ctx.emit),
      translate: useTranslate(),
      useAssetUrl: useAssetUrl,
    };
  },
});
</script>
