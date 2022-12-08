<template>
  <a v-bind="linkAttributes">
    <PdkIcon
      v-if="resolvedAction.icon"
      class="mr-1"
      :icon="resolvedAction.icon" />
    <!-- Link content. Can be used instead of `label` prop. -->
    <slot v-if="!hideText">
      {{ translate(resolvedAction.label) }}
    </slot>
  </a>
</template>

<script lang="ts">
import {PdkButtonAction, useAction, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, computed, defineComponent} from 'vue';

/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons and a label. The button can be
 * disabled.
 */
export default defineComponent({
  name: 'DefaultPdkLink',
  props: {
    action: {
      type: Object as PropType<PdkButtonAction>,
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
    const resolvedAction = useAction(props.action);

    const onClick: (event: MouseEvent) => void = (event: MouseEvent) => {
      resolvedAction.value.onClick?.(event);

      ctx.emit('click', event);
    };

    return {
      resolvedAction,
      translate: useTranslate(),

      linkAttributes: computed(() => {
        const attributes: Record<string, unknown> = {...props};

        if (props.href?.startsWith('http')) {
          attributes.rel = 'noopener noreferrer';
          attributes.target = '_blank';
        } else {
          attributes['onClick.prevent'] = onClick;
        }

        return attributes;
      }),
    };
  },
});
</script>
