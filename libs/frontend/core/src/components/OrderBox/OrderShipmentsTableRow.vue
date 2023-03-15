<template>
  <PdkTableRow :loading="loading">
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
        v-text="shipmentUpdatedAt" />
    </PdkTableCol>

    <PdkTableCol align="right">
      <PdkDropdownButton :actions="actions" />
    </PdkTableCol>
  </PdkTableRow>
</template>

<script setup lang="ts">
import {Format, useLocalizedFormatter, useShipmentData} from '../../composables';
import {PropType, computed} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {Shipment} from '@myparcel-pdk/common/src';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useVModel} from '@vueuse/core';

const props = defineProps({
  shipment: {
    type: Object as PropType<Required<Shipment.ModelShipment>>,
    required: true,
  },

  // eslint-disable-next-line vue/no-unused-properties
  modelValue: {
    type: Array as PropType<number[]>,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const selected = useVModel(props, undefined, emit);

const checkboxElement = {
  id: `shipment_${props.shipment.id}`,
  ref: selected,
  form: {
    name: `shipment-${props.shipment.id}`,
  },
} as unknown as InteractiveElementInstance;

const formatter = useLocalizedFormatter();

const {actions} = useShipmentData(props.shipment);

const shipmentUpdatedAt = computed(() => {
  return props.shipment.updated ? formatter.format(Format.DateRelative, props.shipment.updated) : '–';
});
</script>
