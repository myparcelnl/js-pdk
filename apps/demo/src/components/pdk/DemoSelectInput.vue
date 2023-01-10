<template>
  <select
    :id="id"
    v-model="model"
    :disabled="element.isDisabled || element.isSuspended"
    class="border flex-grow px-2 py-1 rounded">
    <option
      v-for="(item, index) in element.props?.options"
      :key="index"
      :disabled="item.disabled || element.isDisabled || element.isSuspended"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent, watchEffect} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {generateFieldId} from '@myparcel-pdk/frontend-core';
import {useVModel} from '@vueuse/core';

/**
 * A select box. Renders a list of options which each have their own value.
 * @see import('@myparcel/pdk-components').DefaultSelectInput
 */
export default defineComponent({
  name: 'DemoSelectInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    watchEffect(() => {
      if (props.element.props?.options?.length && !props.modelValue) {
        model.value = props.element.props.options[0].value;
      }
    });

    return {
      id: generateFieldId(props.element),
      model,
    };
  },
});
</script>
