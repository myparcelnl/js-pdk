<template>
  <PdkTableRow>
    <PdkTableCol>
      <PdkCheckboxInput
        v-model="selected"
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
      <PdkDropdownButton :actions="actions" />
    </PdkTableCol>
  </PdkTableRow>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useFormatter, useLanguage, useShipmentData} from '../../composables';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {Shipment} from '@myparcel-pdk/common/src';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'OrderShipmentsTableRow',
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
    const {translate} = useLanguage();

    const selected = useVModel(props, 'modelValue', ctx.emit);

    const checkboxElement = {
      id: `shipment_${props.shipment.id}`,
      ref: selected,
      form: {
        name: `shipment-${props.shipment.id}`,
      },
    } as unknown as InteractiveElementInstance;

    return {
      ...useShipmentData(props.shipment),
      formatter: useFormatter(),
      selected,
      translate,
      checkboxElement,
    };
  },
});
</script>
