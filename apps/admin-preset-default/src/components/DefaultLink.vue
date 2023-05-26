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
 * This component is used to render a link. The link can be used to trigger an action.
 */
import {type AnchorHTMLAttributes, type PropType, computed} from 'vue';
import {
  type ActionDefinition,
  getActionIdentifier,
  useActionStore,
  useLanguage,
} from '@myparcel-pdk/frontend-admin-core';

const props = defineProps({
  action: {
    type: Object as PropType<ActionDefinition>,
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

const actionStore = useActionStore();

const actionIdentifier = computed<string>(() => getActionIdentifier(props.action));

const onClick = (event: MouseEvent): void => {
  event.preventDefault();
  emit('click', event);

  if (!actionIdentifier.value) {
    return;
  }

  void actionStore.dispatch(actionIdentifier.value, props.action?.parameters);
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

const {translate} = useLanguage();
</script>
