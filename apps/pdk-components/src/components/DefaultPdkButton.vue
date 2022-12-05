<template>
  <button
    :class="{
      'px-5 py-2': 'md' === size,
      'px-3 py-1 text-sm': 'sm' === size,
      'px-2 py-0.5 text-xs': 'xs' === size,
    }"
    :disabled="disabled"
    class="active:bg-orange-800 bg-orange-600 duration-75 focus:bg-orange-700 hover:bg-orange-700 rounded-full text-white transition-colors"
    type="button"
    @click="() => $emit('click')">
    <PdkIcon
      v-for="iconName in icons"
      :key="iconName"
      class="mr-1">
      {{ iconName }}
    </PdkIcon>
    <!-- Button content. Can be used instead of `label` prop. -->
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {toArray} from '@myparcel/ts-utils';
import {useTranslate} from '@myparcel-pdk/frontend-core';

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
     * Button size. Can be `xs`, `sm` or `md`.
     */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['md', 'sm', 'xs'].includes(value),
    },

    /**
     * Icon.
     */
    icon: {
      type: [Array, String] as PropType<string | string[]>,
      default: () => [],
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

  setup: (props) => ({
    translate: useTranslate(),
    icons: computed(() => toArray(props.icon)),
  }),
});
</script>
