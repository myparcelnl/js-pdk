<template>
  <div class="flex">
    <label class="w-1/3">
      <slot name="label">
        {{ translate(label) }}
      </slot>
    </label>
    <div class="w-2/3">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTranslate} from '@myparcel-pdk/frontend-core';

/**
 * @see import('@myparcel/pdk-components').DefaultFormGroup
 */
export default defineComponent({
  name: 'DemoFormGroup',
  props: {
    label: {
      type: String,
      default: null,
    },
  },

  setup: () => ({
    translate: useTranslate(),
  }),
});
</script>
