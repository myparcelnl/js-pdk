<template>
  <i
    v-test="AdminComponent.Icon"
    v-text="icon" />
</template>

<script lang="ts" setup>
import {type PropType} from 'vue';
import {type AdminIcon} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

defineProps({
  /**
   * The icon to display.
   */
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});
</script>
