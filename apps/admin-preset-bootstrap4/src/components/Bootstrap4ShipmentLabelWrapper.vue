<template>
  <PdkBox
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
import {type ShipmentLabelWrapperProps, Size} from '@myparcel-pdk/admin';
import LoadingOverlay from './common/LoadingOverlay.vue';

defineProps<ShipmentLabelWrapperProps>();
</script>
