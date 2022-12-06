<template>
  <button
    :class="{
      'px-5 py-2': 'md' === size,
      'px-3 py-1 text-sm': 'sm' === size,
      'px-2 py-0.5 text-xs': 'xs' === size,
    }"
    :disabled="resolvedProps.disabled"
    class="active:bg-orange-800 bg-orange-600 duration-75 focus:bg-orange-700 hover:bg-orange-700 rounded-full text-white transition-colors"
    type="button"
    @click="onClick">
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
import {toArray} from '@myparcel/ts-utils';
import {PdkButtonAction, useTranslate} from '@myparcel-pdk/frontend-core';
import {ComputedRef, PropType, computed, defineComponent} from 'vue';

/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons and a label. The button can be
 * disabled.
 */
export default defineComponent({
  name: 'DefaultPdkButton',
  props: {
    action: {
      type: Object as PropType<PdkButtonAction>,
      default: null,
    },

    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean as PropType<PdkButtonAction['disabled']>,
      default: false,
    },

    /**
     * Icon.
     */
    icon: {
      type: [Array, String] as PropType<PdkButtonAction['icon']>,
      default: () => [],
    },

    /**
     * Button label. Can be used instead of the slot.
     */
    label: {
      type: String as PropType<PdkButtonAction['label']>,
      default: 'action_save',
    },

    /**
     * Button size. Can be `xs`, `sm` or `md`.
     */
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['md', 'sm', 'xs'].includes(value),
    },
  },

  emits: ['click'],

  setup: (props, ctx) => {
    const resolvedProps: ComputedRef<Partial<PdkButtonAction>> = computed(() => {
      console.log(props);

      if (!props.action) {
        return props;
      }

      return {
        ...props.action,
        ...props,
      };
    });

    return {
      icons: computed(() => toArray(props.icon)),
      resolvedProps,
      translate: useTranslate(),
      onClick: (event: MouseEvent) => {
        resolvedProps.value.onClick?.(event);
        ctx.emit('click', event);
      },
    };
  },
});
</script>
