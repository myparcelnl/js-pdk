<template>
  <button
    v-test="AdminComponent.Button"
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

<script lang="ts" setup>
/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons, a label and various sizes. The button can be
 * disabled.
 */

import {type PropType} from 'vue';
import {AdminComponent, type AdminIcon, Size, useLanguage} from '@myparcel-pdk/admin';

defineProps({
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
    default: Size.Medium,
  },
});

defineEmits(['click']);

const {translate} = useLanguage();
</script>
