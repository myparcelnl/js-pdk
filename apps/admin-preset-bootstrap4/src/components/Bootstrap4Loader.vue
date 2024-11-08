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
import {computed} from 'vue';
import {AdminComponent, type LoaderProps, Size, useLanguage} from '@myparcel-pdk/admin';

const props = withDefaults(defineProps<LoaderProps>(), {
  size: Size.Medium,
  tag: 'div',
});

const {translate} = useLanguage();

const sizeClasses = computed(() => ({
  [`spinner-border-${Size.Small}`]: [Size.Small, Size.ExtraSmall].includes(props.size),
}));
</script>
