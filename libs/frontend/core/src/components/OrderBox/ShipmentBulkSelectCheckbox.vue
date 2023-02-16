<template>
  <PdkCheckboxInput
    v-model="bulkCheckbox"
    :title="translate('select_all')"
    :element="bulkCheckboxElement" />
</template>

<script setup lang="ts">
import {PropType, computed} from 'vue';
import {createFormElement} from '../../utils';
import {useLanguage} from '../../composables';

const props = defineProps({
  shipmentCount: {
    type: Number,
    required: true,
  },

  modelValue: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emit = defineEmits(['select']);

const bulkCheckbox = computed({
  get(): boolean {
    return props.modelValue.length === props.shipmentCount;
  },

  set(bulkCheckboxChecked: boolean): void {
    const checked = bulkCheckboxChecked || props.shipmentCount === props.modelValue.length;

    emit('select', checked);
  },
});

const bulkCheckboxElement = createFormElement(
  {
    name: 'bulk-shipments',
    ref: bulkCheckbox,
    disabledWhen: () => props.shipmentCount === 0,
  },
  'order-shipments',
);

const {translate} = useLanguage();
</script>
