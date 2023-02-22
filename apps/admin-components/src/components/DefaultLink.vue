<template>
  <a
    :data-test-id="`link${action ? `-${action.id}` : ''}`"
    v-bind="linkAttributes">
    <PdkIcon
      v-if="action?.icon"
      :icon="action?.icon" />
    <!-- Link content. Can be used instead of `label` prop. -->
    <slot v-if="!hideText">
      {{ translate(action?.label) }}
    </slot>
  </a>
</template>

<script lang="ts" setup>
/**
 * This component is used to render a button. The button can be used to trigger
 * an action. The button can have multiple icons and a label. The button can be
 * disabled.
 */
import {AnchorHTMLAttributes, PropType, computed} from 'vue';
import {ResolvedAction, useLanguage} from '@myparcel-pdk/frontend-core/src';

const props = defineProps({
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
});

const emit = defineEmits(['click']);

const {translate} = useLanguage();

const onClick = async (event: MouseEvent): Promise<void> => {
  event.preventDefault();
  emit('click', event);
  await props.action?.onClick();
};

const linkAttributes = computed(() => {
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
});
</script>
