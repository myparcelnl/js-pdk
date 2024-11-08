<template>
  <span v-test="AdminComponent.Badge">&nbsp;(<slot />)</span>
</template>

<script lang="ts" setup>
import {AdminComponent, type BadgeProps, type BadgeSlots} from '@myparcel-pdk/admin';

defineProps<BadgeProps>();
defineSlots<BadgeSlots>();
</script>
