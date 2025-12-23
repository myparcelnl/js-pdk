<template>
  <PdkLoader v-if="loading" />

  <div
    v-else
    v-test="AdminComponent.Box">
    <div
      v-if="$slots.header || title"
      @click="$emit('clickHeader')">
      <!-- Box header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div>
      <!-- Box content. -->
      <slot />
    </div>

    <div v-if="$slots.footer">
      <!-- Box footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent, type BoxEmits, type BoxProps, type BoxSlots, Size, useLanguage} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
withDefaults(defineProps<BoxProps>(), {
  loading: false,
  size: Size.Medium,
});
defineEmits<BoxEmits>();
defineSlots<BoxSlots>();

const {translate} = useLanguage();
</script>
