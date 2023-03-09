<template>
  <div
    :class="{
      'opacity-50': loading,
    }"
    class="border mb-4 rounded-xl">
    <div
      v-if="$slots.header"
      class="bg-zinc-50 border-newItem font-bold text-lg"
      :class="paddingClasses">
      <slot name="header" />
    </div>

    <div :class="paddingClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="d-flex"
      :class="paddingClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {Size} from '@myparcel-pdk/common';

const props = defineProps({
  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.MEDIUM,
  },
});

const paddingClasses = computed(() => ({
  'p-2': [Size.SMALL, Size.EXTRA_SMALL].includes(props.size),
  'p-4': [Size.MEDIUM].includes(props.size),
  'p-5': [Size.LARGE, Size.EXTRA_LARGE].includes(props.size),
}));
</script>
