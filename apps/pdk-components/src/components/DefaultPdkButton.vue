<template>
  <button
    :disabled="disabled"
    class="active:bg-orange-800 bg-orange-600 duration-75 focus:bg-orange-700 hover:bg-orange-700 px-5 py-2 rounded-full text-white transition-colors"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      class="mr-1"
      :icon="icon" />
    <!-- Button content. Can be used instead of `label` prop. -->
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts">
import {PdkIcon, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

// const sizePropValidator: (value: string) => boolean = (value: string) => ['md', 'sm', 'xs'].includes(value);
/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons and a label. The button can be
 * disabled.
 */
export default defineComponent({
  name: 'DefaultPdkButton',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * Icon.
     */
    icon: {
      type: String as PropType<PdkIcon>,
      default: null,
    },

    /**
     * Button label. Can be used instead of the slot.
     */
    label: {
      type: String,
      default: 'action_save',
    },
  },

  emits: ['click'],

  setup: () => ({
    translate: useTranslate(),
  }),
});
</script>
