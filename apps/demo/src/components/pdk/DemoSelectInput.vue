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
import {ElementInstance, generateFieldId} from '@myparcel/pdk-frontend';
import {PropType, defineComponent, onMounted} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A select box. Renders a list of options which each have their own value.
 * @see import('@myparcel/pdk-components').DefaultSelectInput
 */
export default defineComponent({
  name: 'DemoSelectInput',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    onMounted(() => {
      if (props.element.props?.options?.length === 1 || !props.modelValue) {
        model.value = props.element.props.options[0]?.value;
      }
    });

    return {
      id: generateFieldId(props.element),
      model,
    };
  },
});
</script>
