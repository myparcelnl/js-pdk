<template>
  <a v-bind="linkAttributes">
    <PdkIcon
      v-if="action?.icon"
      :icon="action?.icon"
      class="mr-1" />
    <!-- Link content. Can be used instead of `label` prop. -->
    <slot v-if="!hideText">
      {{ translate(action?.label) }}
    </slot>
  </a>
</template>

<script lang="ts">
import {AnchorHTMLAttributes, PropType, computed, defineComponent} from 'vue';
import {ResolvedAction, useLanguage} from '@myparcel-pdk/frontend-core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultLink
 */
export default defineComponent({
  name: 'DemoLink',
  props: {
    action: {
      type: Object as PropType<ResolvedAction>,
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
    const {translate} = useLanguage();

    const onClick = async (event: MouseEvent): Promise<void> => {
      event.preventDefault();
      ctx.emit('click', event);
      await props.action?.onClick?.();
    };

    return {
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

      translate,
    };
  },
});
</script>
