<template>
  <a v-bind="linkAttributes">
    <PdkIcon
      v-if="resolvedAction?.icon"
      :icon="resolvedAction?.icon" />
    <!-- Link content. Can be used instead of `label` prop. -->
    <slot v-if="!hideText">
      {{ translate(resolvedAction?.label) }}
    </slot>
  </a>
</template>

<script lang="ts">
import {AnchorHTMLAttributes, PropType, computed, defineComponent} from 'vue';
import {PdkAction, useLanguage} from '@myparcel/pdk-frontend';
import {createAction} from '@myparcel-pdk/frontend-core';

/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons and a label. The button can be
 * disabled.
 */
export default defineComponent({
  name: 'DefaultLink',
  props: {
    action: {
      type: Object as PropType<PdkAction>,
      default: null,
    },

    hideText: {
      type: Boolean,
    },

    href: {
      type: String,
      default: '#',
    },
  },

  emits: ['click'],

  setup: (props, ctx) => {
    const resolvedAction = createAction(props.action);
    const {translate} = useLanguage();

    const onClick = async (event: MouseEvent): Promise<void> => {
      event.preventDefault();
      ctx.emit('click', event);
      await resolvedAction?.handler();
    };

    return {
      resolvedAction,
      translate,

      linkAttributes: computed(() => {
        const attributes: AnchorHTMLAttributes = {
          href: props.href,
        };

        if (attributes.href?.startsWith('http')) {
          attributes.rel = 'noopener noreferrer';
          attributes.target = '_blank';
        } else {
          attributes.onClick = onClick;
        }

        return attributes;
      }),
    };
  },
});
</script>
