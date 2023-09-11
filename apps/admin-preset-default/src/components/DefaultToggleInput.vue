<template>
  <label v-test="[AdminComponent.ToggleInput, element]">
    <input
      :id="id"
      v-model="model"
      :name="id"
      :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
      :readonly="element.isReadOnly"
      :value="true"
      type="checkbox" />

    <label :for="id">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </label>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {
  AdminComponent,
  generateFieldId,
  type ToggleInputEmits,
  type ToggleInputProps,
  useLanguage,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ToggleInputProps>();
const emit = defineEmits<ToggleInputEmits>();

const propRefs = toRefs(props);

const model = useVModel(props, undefined, emit);

const id = generateFieldId(propRefs.element);

const {translate} = useLanguage();
</script>
