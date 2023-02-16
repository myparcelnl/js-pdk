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
/* eslint-disable vue/no-unused-properties */
import {AdminIcon, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {Size} from '@myparcel-pdk/common';

/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons, a label and various sizes. The button can be
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
      type: String as PropType<AdminIcon>,
      default: null,
    },

    /**
     * Button label. Can be used instead of the slot.
     */
    label: {
      type: String,
      default: 'action_save',
    },

    /**
     * Size of the button.
     */
    size: {
      type: String as PropType<Size>,
      default: Size.MEDIUM,
    },
  },

  emits: ['click'],

  setup: () => {
    const {translate} = useLanguage();

    return {
      translate,
    };
  },
});
</script>
