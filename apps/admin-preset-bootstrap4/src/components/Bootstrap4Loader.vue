<template>
  <component
    :is="tag"
    v-test="AdminComponent.Loader"
    :class="sizeClasses"
    class="spinner-border text-primary"
    role="status">
    <span
      class="sr-only"
      v-text="translate('loading')" />
  </component>
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {AdminComponent, Size, useLanguage} from '@myparcel-pdk/admin';

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },

  tag: {
    type: String,
    default: 'div',
  },
});

const {translate} = useLanguage();

const sizeClasses = computed(() => ({
  [`spinner-border-${Size.Small}`]: [Size.Small, Size.ExtraSmall].includes(props.size),
}));
</script>
