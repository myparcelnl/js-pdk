<template>
  <PdkTableRow>
    <PdkTableCol>
      <PdkCheckboxInput
        v-model="model"
        :element="checkboxElement"
        :value="shipment.id" />
    </PdkTableCol>

    <PdkTableCol>
      <ShipmentBarcode :shipment="shipment" />
    </PdkTableCol>

    <PdkTableCol>
      <ShipmentStatus :shipment="shipment" />
    </PdkTableCol>

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
import {deleteAction, shipmentCreateReturnAction, shipmentPrintAction, shipmentRefreshAction} from '../../actions';
import {useAssetUrl, useFormatter, useLanguage, useLoading} from '../../composables';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {Shipment} from '@myparcel-pdk/common';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {createActions} from '../../services';
import {useCarriers} from '../../sdk';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'ShipmentLabelTableRow',
  components: {
    ShipmentStatus,
    ShipmentBarcode,
  },

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
    const {translate} = useLanguage();

    const {loading, setLoading} = useLoading();

    const model = useVModel(props, 'modelValue', ctx.emit);

    const checkboxElement = {
      id: `shipment_${props.shipment.id}`,
      ref: model,
      form: {
        name: `shipment-${props.shipment.id}`,
      },
    } as unknown as InteractiveElementInstance;

    return {
      loading,

      carrier: carriersQuery.data,

      dropdownActions: createActions(
        [{...shipmentPrintAction, standalone: true}, shipmentRefreshAction, shipmentCreateReturnAction, deleteAction],
        {
          orderIds: props.shipment.orderId,
          shipmentIds: props.shipment.id,
        },
        {
          start() {
            setLoading(true);
          },
          end() {
            setLoading(false);
          },
        },
      ),

      formatter: useFormatter(),
      model,
      translate: translate,
      useAssetUrl: useAssetUrl,

      checkboxElement,
    };
  },
});
</script>
