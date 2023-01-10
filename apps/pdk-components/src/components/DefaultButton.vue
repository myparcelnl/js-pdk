<template>
  <button
    :disabled="disabled"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      :icon="icon" />
    <!-- Button content. Can be used instead of `label` prop. -->
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts">
import {PdkIcon, useTranslate} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';

/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons and a label. The button can be
 * disabled.
 */
export default defineComponent({
  name: 'DefaultButton',
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
