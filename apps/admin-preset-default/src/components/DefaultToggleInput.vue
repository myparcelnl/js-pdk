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
import {
  AdminComponent,
  type ToggleInputEmits,
  type ToggleInputProps,
  useElementContext,
  useLanguage,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ToggleInputProps>();
const emit = defineEmits<ToggleInputEmits>();

const {id, model} = useElementContext(props, emit);

const {translate} = useLanguage();
</script>
