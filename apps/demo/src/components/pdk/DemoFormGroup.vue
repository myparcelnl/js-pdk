<template>
  <div class="flex">
    <div class="px-2 py-2 text-right w-1/3">
      <label
        :for="id"
        v-text="element.label" />

      <ul v-if="element.errors.length">
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

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {generateFieldId, useTranslate} from '@myparcel-pdk/frontend-core';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';

/**
 * @see import('@myparcel/pdk-components').DefaultFormGroup
 */
export default defineComponent({
  name: 'DemoFormGroup',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },
  },

  setup: (props) => ({
    translate: useTranslate(),
    id: generateFieldId(props.element),
  }),
});
</script>
