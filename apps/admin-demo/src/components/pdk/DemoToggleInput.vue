<template>
  <label
    :for="toggleId"
    class="cursor-pointer flex items-center">
    <input
      :id="id"
      v-model="model"
      class="invisible"
      type="hidden" />

    <div
      v-test="AdminComponent.ToggleInput"
      :class="{
        'opacity-50': element.isDisabled || element.isSuspended || element.isReadOnly,
      }"
      class="relative">
      <input
        :id="toggleId"
        v-model="toggleModel"
        :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
        :readonly="element.isReadOnly"
        class="sr-only"
        type="checkbox" />

      <div
        :class="{
          'bg-green-400 dark:bg-green-600': toggleModel,
          'bg-gray-600': !toggleModel,
        }"
        class="bg-gray-600 block h-8 rounded-full transition-colors w-14" />

      <div
        :class="{
          'translate-x-6': toggleModel,
          'translate-x-0': !toggleModel,
        }"
        class="absolute bg-white h-6 left-1 rounded-full top-1 transition w-6" />
    </div>
  </label>
</template>

<script lang="ts" setup>
import {AdminComponent, type ToggleInputEmits, type ToggleInputProps, useToggleInputContext} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ToggleInputProps>();
const emit = defineEmits<ToggleInputEmits>();

const {id, model, toggleId, toggleModel} = useToggleInputContext(props, emit);
</script>
