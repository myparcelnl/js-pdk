<template>
  <component
    :is="tag"
    v-test="AdminComponent.Loader">
    {{ translate('loading') }}
  </component>
</template>

<script lang="ts" setup>
import {useLanguage} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});

const {translate} = useLanguage();
</script>
