<template>
  <a
    @click="onClick"
    v-bind="attributes">
    <PdkIcon
      v-for="iconName in icons"
      :key="iconName"
      class="mr-1">
      {{ iconName }}
    </PdkIcon>
    <!-- Link content. Can be used instead of `label` prop. -->
    <slot>
      {{ translate(resolvedAction.label) }}
    </slot>
  </a>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-properties */
import {PdkButtonAction, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, computed, defineComponent, AnchorHTMLAttributes} from 'vue';
import {toArray} from '@myparcel/ts-utils';
import {usePropAction} from '@myparcel-pdk/frontend-core/src/services/usePropAction';

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

    href: {
      type: String,
      default: null,
    },

    /**
     * Icon.
     */
    icon: {
      type: [Array, String] as PropType<PdkButtonAction['icon']>,
      default: () => [],
    },

    /**
     * Label. Can be used instead of the slot.
     */
    label: {
      type: String as PropType<PdkButtonAction['label']>,
      default: 'action_save',
    },
  },

  emits: ['click'],

  setup: (props, ctx) => {
    const resolvedAction = usePropAction(props);

    return {
      icons: computed(() => toArray(resolvedAction.value.icon)),
      resolvedAction,
      translate: useTranslate(),

      onClick: (event: MouseEvent) => {
        resolvedAction.value.onClick?.(event);

        ctx.emit('click', event);
      },

      attributes: computed(() => {
        const attributes: AnchorHTMLAttributes = { ...props };

        if (props.href && props.href.startsWith('http')) {
          attributes.rel = 'noopener noreferrer';
          attributes.target = '_blank';
        }

        return attributes;
      }),
    };
  },
});
</script>
