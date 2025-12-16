<template>
  <button
    :disabled="disabled || loading"
    type="button"
    :class="sizeClasses"
    @click="$emit('click')">
    <PdkLoader
      v-if="loading"
      :size="Size.ExtraSmall"
      class="d-inline-block mr-1" />

    <PdkIcon
      v-if="icon"
      :icon="icon"
      class="mr-1" />

    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {type AdminIcon, Size, useLanguage} from '@myparcel-dev/pdk-admin';

const props = defineProps({
  disabled: {
    type: Boolean,
  },

  icon: {
    type: String as PropType<AdminIcon>,
    default: null,
  },

  label: {
    type: String,
    default: null,
  },

  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },
});

defineEmits<(event: 'click') => void>();

const {translate} = useLanguage();

const sizeClasses = computed(() => ({
  [`btn-${Size.Small}`]: [Size.Small, Size.ExtraSmall].includes(props.size),
}));
</script>
