<template>
  <div class="form-check">
    <input
      :id="id"
      v-model="model"
      :name="id"
      :disabled="element.isDisabled || element.isSuspended"
      class="form-check-input"
      type="checkbox" />
    <label
      :for="id"
      class="form-check-label">
    </label>
  </div>
</template>

<script generic="T extends CheckboxInputModelValue" lang="ts" setup>
import {
  type CheckboxInputEmits,
  type CheckboxInputModelValue,
  type CheckboxInputProps,
  useElementContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<CheckboxInputProps<T>>();
const emit = defineEmits<CheckboxInputEmits<T>>();

const {id, model} = useElementContext(props, emit);
</script>
