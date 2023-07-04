<template>
  <label
    :for="id"
    class="cursor-pointer flex items-center">
    <div
      class="relative"
      :class="{
        'opacity-50': element.isDisabled || element.isSuspended || element.isReadOnly,
      }">
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        class="sr-only"
        :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
        :readonly="element.isReadOnly" />

      <div
        class="bg-gray-600 block h-8 rounded-full transition-colors w-14"
        :class="{
          'bg-green-400 dark:bg-green-600': model,
          'bg-gray-600': !model,
        }" />

      <div
        class="absolute bg-white h-6 left-1 rounded-full top-1 transition w-6"
        :class="{
          'translate-x-6': model,
          'translate-x-0': !model,
        }" />
    </div>
  </label>
</template>

<script setup lang="ts" generic="T extends boolean">
import {useVModel} from '@vueuse/core';
import {generateFieldId, type PdkElementEmits, type PdkElementProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<PdkElementProps<T>>();
const emit = defineEmits<PdkElementEmits<T>>();

const id = generateFieldId(props.element);

const model = useVModel(props, undefined, emit);
</script>
