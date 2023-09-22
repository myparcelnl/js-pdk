<template>
  <component
    :is="tag"
    v-test="AdminComponent.Loader">
    <div
      class="spinner-border text-primary"
      role="status">
      <span
        class="sr-only"
        v-text="translate('loading')" />
    </div>
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
