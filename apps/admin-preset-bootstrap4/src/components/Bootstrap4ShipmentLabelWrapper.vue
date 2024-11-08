<template>
  <PdkBox
    v-test="AdminComponent.ShipmentLabelWrapper"
    :class="{
      'text-muted': loading,
    }"
    :size="Size.ExtraSmall"
    class="mb-1">
    <LoadingOverlay v-if="loading" />

    <slot />
  </PdkBox>
</template>

<script lang="ts" setup>
import {
  AdminComponent,
  type ShipmentLabelWrapperProps,
  type ShipmentLabelWrapperSlots,
  Size,
} from '@myparcel-pdk/admin';
import LoadingOverlay from './common/LoadingOverlay.vue';

defineProps<ShipmentLabelWrapperProps>();
defineSlots<ShipmentLabelWrapperSlots>();
</script>
