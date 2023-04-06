<template>
  <component
    :is="tag"
    v-test="'Loader'">
    {{ translate('loading') }}
  </component>
</template>

<script setup lang="ts">
import {useLanguage} from '@myparcel-pdk/frontend-admin-core/src';

defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});

const {translate} = useLanguage();
</script>
