<template>
  <button
    v-test="AdminComponent.Button"
    :disabled="disabled"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      :icon="icon" />
    <!-- Button content. Can be used instead of `label` prop. -->
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts" setup>
import {
  AdminComponent,
  type ButtonEmits,
  type ButtonProps,
  type ButtonSlots,
  Size,
  useLanguage,
} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
withDefaults(defineProps<ButtonProps>(), {
  label: 'action_save',
  size: Size.Medium,
});
defineEmits<ButtonEmits>();
defineSlots<ButtonSlots>();

const {translate} = useLanguage();
</script>
