<template>
  <PdkCheckboxInput
    v-model="model"
    v-test="$.type.__name"
    :element="bulkCheckboxElement"
    :title="translate('select_all')" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {type Keyable} from '@myparcel-dev/pdk-common';
import {createFormElement} from '../../utils';
import {useLanguage} from '../../composables';

const NAME_BULK = 'bulk';

const props = defineProps<{
  options: Keyable[];
  modelValue: Partial<Record<Keyable, boolean>>;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: Record<Keyable, boolean>) => void>();

const model = computed({
  get(): boolean {
    const values = Object.values(props.modelValue);

    return values.length > 0 && values.every(Boolean);
  },

  set(checked: boolean): void {
    emit('update:modelValue', Object.fromEntries(props.options.map((option) => [option, checked])));
  },
});

const bulkCheckboxElement = createFormElement(
  {
    name: NAME_BULK,
    ref: model,
    disabledWhen: () => props.options.length === 0,
  },
  NAME_BULK,
);

const {translate} = useLanguage();
</script>
