<template>
  <BaseButton
    v-test="AdminComponent.Button"
    :class="sizeClasses"
    :disabled="disabled"
    class="btn btn-primary text-nowrap"
    v-bind="$props"
    @click="$emit('click')">
    <slot />
  </BaseButton>
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-unused-properties */
import {computed} from 'vue';
import {AdminComponent, type ButtonEmits, type ButtonProps, type ButtonSlots, Size} from '@myparcel-pdk/admin';
import BaseButton from './common/BaseButton.vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'action_save',
  size: Size.Medium,
});
defineEmits<ButtonEmits>();
defineSlots<ButtonSlots>();

const sizeClasses = computed(() => {
  switch (props.size) {
    case Size.ExtraSmall:
    case Size.Small:
      return 'btn-sm';

    case Size.Large:
    case Size.ExtraLarge:
      return 'btn-lg';

    default:
      return '';
  }
});
</script>
