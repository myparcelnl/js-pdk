<template>
  <a
    v-test="`${AdminComponent.Link}${action ? `-${action.id}` : ''}`"
    v-bind="linkAttributes">
    <PdkIcon
      v-if="action?.icon"
      :icon="action?.icon" />
    <slot v-if="!hideText">
      {{ translate(action?.label) }}
    </slot>
  </a>
</template>

<script lang="ts" setup>
import {type AnchorHTMLAttributes, computed} from 'vue';
import {
  AdminComponent,
  getActionIdentifier,
  type LinkEmits,
  type LinkProps,
  type LinkSlots,
  useActionStore,
  useLanguage,
} from '@myparcel-dev/pdk-admin';

const props = withDefaults(defineProps<LinkProps>(), {
  href: '#',
});

const emit = defineEmits<LinkEmits>();

defineSlots<LinkSlots>();

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
