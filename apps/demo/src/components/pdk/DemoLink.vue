<template>
  <a v-bind="linkAttributes">
    <PdkIcon
      v-if="resolvedAction?.icon"
      class="mr-1"
      :icon="resolvedAction?.icon" />
    <!-- Link content. Can be used instead of `label` prop. -->
    <slot v-if="!hideText">
      {{ translate(resolvedAction?.label) }}
    </slot>
  </a>
</template>

<script lang="ts">
import {AnchorHTMLAttributes, PropType, computed, defineComponent} from 'vue';
import {PdkButtonAction, useAction, useTranslate} from '@myparcel/pdk-frontend';

/**
 * @see import('@myparcel/pdk-components').DefaultLink
 */
export default defineComponent({
  name: 'DemoLink',
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

    const onClick = async (event: MouseEvent): Promise<void> => {
      event.preventDemo();
      ctx.emit('click', event);
      await resolvedAction.value?.onClick?.();
    };

    return {
      resolvedAction,
      translate: useTranslate(),

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
