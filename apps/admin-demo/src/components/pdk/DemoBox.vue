<template>
  <div
    :class="{
      'opacity-50': loading,
    }"
    class="mb-4">
    <div
      v-if="$slots.header"
      :class="paddingClasses"
      class="bg-gray-50 border border-1 border-b-0 dark:bg-gray-700 font-bold overflow-hidden rounded-t-xl text-lg">
      <slot name="header" />
    </div>

    <div
      :class="[paddingClasses, bodyClasses]"
      class="border-l border-r">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      :class="paddingClasses"
      class="border border-t-0 d-flex rounded-b-xl">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType, computed, useSlots} from 'vue';
import {Size} from '@myparcel-pdk/common';

const slots = useSlots();

const props = defineProps({
  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },
});

const paddingClasses = computed(() => ({
  'p-2': [Size.Small, Size.ExtraSmall].includes(props.size),
  'p-4': [Size.Medium].includes(props.size),
  'p-5': [Size.Large, Size.ExtraLarge].includes(props.size),
}));

const bodyClasses = computed(() => ({
  'border-b rounded-b-xl': !slots.footer,
  'border-t rounded-t-xl': !slots.header,
}));
</script>
