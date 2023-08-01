<template>
  <PdkTableRow :class="classes">
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
        :title="shipment.updated?.date"
        v-text="shipmentUpdatedAt" />
    </PdkTableCol>

    <PdkTableCol align="right">
      <PdkDropdownButton :actions="actions" />
    </PdkTableCol>
  </PdkTableRow>
</template>

<script lang="ts" setup>
import {computed, toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import ShipmentStatus from '../common/ShipmentStatus.vue';
import ShipmentBarcode from '../common/ShipmentBarcode.vue';
import {createClasses} from '../../utils/createClasses';
import {useQueryStore} from '../../stores';
import {Format, useAdminConfig, useLocalizedFormatter, useShipmentData} from '../../composables';

const props = defineProps<{
  shipmentId: number;
  // eslint-disable-next-line vue/no-unused-properties
  modelValue?: boolean;
}>();

const {shipmentId} = toRefs(props);

const emit = defineEmits<(event: 'update:modelValue', value: boolean) => void>();

const config = useAdminConfig();
const formatter = useLocalizedFormatter();
const queryStore = useQueryStore();

queryStore.registerShipmentQueries(shipmentId);

const {loading, actions, shipment} = useShipmentData(shipmentId);

const selected = useVModel(props, undefined, emit);

const checkboxElement = {
  id: `shipment_${shipmentId.value}`,
  ref: selected,
  form: {
    name: `shipment-${shipmentId.value}`,
  },
} as unknown as InteractiveElementInstance;

const shipmentUpdatedAt = computed(() => {
  return shipment.value.updated ? formatter.format(Format.DateRelative, shipment.value.updated) : '–';
});

const classes = computed(() => {
  return createClasses([
    {
      key: config?.cssUtilities?.animationLoading,
      value: loading.value,
    },
  ]);
});
</script>
