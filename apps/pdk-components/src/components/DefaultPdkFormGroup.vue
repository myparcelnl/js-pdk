<template>
  <div class="flex">
    <label class="w-1/3">
      <!-- Can be used instead of the label prop. -->
      <slot name="label">
        {{ translate(label) }}
      </slot>
    </label>
    <div class="w-2/3">
      <!-- Form group content. -->
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTranslate} from '@myparcel-pdk/frontend-core';

/**
 * A form group is used to render a label and a form element.
 */
export default defineComponent({
  name: 'DefaultPdkFormGroup',
  props: {
    /**
     * Label of the form group. Can be used instead of the label slot.
     */
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
