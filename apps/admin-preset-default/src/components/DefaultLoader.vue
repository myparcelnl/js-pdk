<template>
  <component
    :is="tag"
    v-test="AdminComponent.Loader">
    {{ translate('loading') }}
  </component>
</template>

<script lang="ts" setup>
import {AdminComponent, useLanguage} from '@myparcel-pdk/admin';

defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});

const {translate} = useLanguage();
</script>
