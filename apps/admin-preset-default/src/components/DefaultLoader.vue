<template>
  <component
    :is="tag"
    v-test="AdminComponent.Loader">
    {{ translate('loading') }}
  </component>
</template>

<script lang="ts" setup>
import {AdminComponent, type LoaderProps, useLanguage} from '@myparcel-pdk/admin';

withDefaults(defineProps<LoaderProps>(), {
  tag: 'div',
});

const {translate} = useLanguage();
</script>
