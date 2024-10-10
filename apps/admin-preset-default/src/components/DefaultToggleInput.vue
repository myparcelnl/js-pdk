<template>
  <div>
    <input
      :id="id"
      v-model="model"
      :name="id"
      type="hidden" />

    <label v-test="AdminComponent.ToggleInput">
      <input
        :id="toggleId"
        v-model="toggleModel"
        :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
        :readonly="element.isReadOnly"
        :value="true"
        type="checkbox" />

      <label :for="toggleId">
        {{ translate(`toggle_${toggleModel ? 'yes' : 'no'}`) }}
      </label>
    </label>
  </div>
</template>

<script lang="ts" setup>
import {
  AdminComponent,
  type ToggleInputEmits,
  type ToggleInputProps,
  useLanguage,
  useToggleInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ToggleInputProps>();
const emit = defineEmits<ToggleInputEmits>();

const {id, model, toggleId, toggleModel} = useToggleInputContext(props, emit);

const {translate} = useLanguage();
</script>
