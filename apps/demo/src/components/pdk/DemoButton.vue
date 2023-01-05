<template>
  <button
    :disabled="disabled"
    :class="[
      'active:bg-orange-800',
      'bg-orange-600',
      'duration-75',
      'focus:bg-orange-700',
      'hover:bg-orange-700',
      'px-5',
      'py-2',
      'rounded-full',
      'text-white',
      'transition-colors',
      'select-none',
    ]"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      class="mr-1"
      :icon="icon" />
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts">
import {PdkIcon, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultButton
 */
export default defineComponent({
  name: 'DemoButton',
  props: {
    disabled: {
      type: Boolean,
    },

    icon: {
      type: String as PropType<PdkIcon>,
      default: null,
    },

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
