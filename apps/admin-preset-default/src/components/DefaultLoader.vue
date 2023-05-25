<template>
  <component
    :is="tag"
    v-test="'Loader'">
    {{ translate('loading') }}
  </component>
</template>

<script lang="ts" setup>
import {useLanguage} from '@myparcel-pdk/frontend-admin-core';

defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});

const {translate} = useLanguage();
</script>
