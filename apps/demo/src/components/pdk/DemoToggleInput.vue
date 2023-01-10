<template>
  <label>
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="true"
      type="checkbox" />

    <label :for="id">
      {{ model ? 'yes' : 'no' }}
    </label>
  </label>
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {generateFieldId} from '@myparcel-pdk/frontend-core';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox. Needs an unique value.
 * @see import('@myparcel/pdk-components').DefaultToggleInput
 */
export default defineComponent({
  name: 'DemoToggleInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean],
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      id: generateFieldId(props.element),
      model,
    };
  },
});
</script>
