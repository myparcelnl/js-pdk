<template>
  <PdkTableRow
    :class="{
      [config?.cssUtilities?.animationLoading]: query.isLoading,
    }">
    <PdkTableCol>
      <PdkCheckboxInput
        v-model="selected"
        :element="checkboxElement"
        :value="shipmentId" />
    </PdkTableCol>

    <PdkTableCol>
      <ShipmentBarcode :shipment-id="shipmentId" />
    </PdkTableCol>

    <PdkTableCol>
      <ShipmentStatus :shipment-id="shipmentId" />
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
import {Format, useAdminConfig, useLocalizedFormatter, useShipmentData} from '../../composables';
import {PropType, computed} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import {useVModel} from '@vueuse/core';
import {useQueryStore} from '../../stores';

const props = defineProps({
  shipmentId: {
    type: Number,
    required: true,
  },

  // eslint-disable-next-line vue/no-unused-properties
  modelValue: {
    type: Array as PropType<number[]>,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const query = useQueryStore().registerShipmentQuery(props.shipmentId);
const {actions, shipment} = useShipmentData(props.shipmentId);

const selected = useVModel(props, undefined, emit);

const checkboxElement = {
  id: `shipment_${props.shipmentId}`,
  ref: selected,
  form: {
    name: `shipment-${props.shipmentId}`,
  },
} as unknown as InteractiveElementInstance;

const formatter = useLocalizedFormatter();

const shipmentUpdatedAt = computed(() => {
  return shipment.value.updated ? formatter.format(Format.DateRelative, shipment.value.updated) : '–';
});

const config = useAdminConfig();
</script>
