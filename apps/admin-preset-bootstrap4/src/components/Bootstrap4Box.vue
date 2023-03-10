<template>
  <div
    :class="{
      'text-muted': loading,
    }"
    class="card">
    <div
      v-if="$slots.header"
      class="card-header">
      <!-- Box header. -->
      <slot name="header" />
    </div>

    <div :class="bodyClass">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, computed} from 'vue';
import {Size} from '@myparcel-pdk/common/src';

const props = defineProps({
  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },
});

const bodyClass = computed(() => ({
  'card-body': [Size.Medium, Size.Large, Size.ExtraLarge].includes(props.size),
}));
</script>
