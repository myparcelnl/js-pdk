<template>
  <i
    v-test="[AdminComponent.Icon, icon]"
    v-text="icon" />
</template>

<script lang="ts" setup>
import {type PropType} from 'vue';
import {AdminComponent, AdminIcon} from '@myparcel-pdk/admin';

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
