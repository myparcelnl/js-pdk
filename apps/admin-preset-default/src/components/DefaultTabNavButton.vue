<template>
  <button
    v-test="AdminComponent.TabNavButton"
    type="button"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import {AdminComponent, type TabNavButtonEmits, type TabNavButtonProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
defineProps<TabNavButtonProps>();
defineEmits<TabNavButtonEmits>();
</script>
