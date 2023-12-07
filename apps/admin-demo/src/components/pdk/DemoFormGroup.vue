<template>
  <div
    v-show="element.isVisible"
    class="flex">
    <div class="px-2 py-2 text-right w-1/3">
      <label
        :for="id"
        v-text="element.label" />

      <ul v-if="element.errors?.length">
        <li
          v-for="error in element.errors"
          :key="error"
          class="text-red-500 text-xs">
          {{ error }}
        </li>
      </ul>
    </div>

    <div class="px-2 py-2 w-2/3">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {type FormGroupProps, generateFieldId} from '@myparcel-pdk/admin';

const props = defineProps<FormGroupProps>();

const propRefs = toRefs(props);

const id = generateFieldId(propRefs.element);
</script>
