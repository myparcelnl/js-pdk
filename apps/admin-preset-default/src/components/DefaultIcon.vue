<template>
  <i
    v-test="[AdminComponent.Icon, icon]"
    v-text="icon" />
</template>

<script lang="ts" setup>
import {AdminComponent, type IconProps} from '@myparcel-dev/pdk-admin';

defineProps<IconProps>();
</script>
