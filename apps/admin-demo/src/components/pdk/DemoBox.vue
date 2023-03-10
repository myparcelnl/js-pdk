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

const paddingClasses = computed(() => ({
  'p-2': [Size.Small, Size.ExtraSmall].includes(props.size),
  'p-4': [Size.Medium].includes(props.size),
  'p-5': [Size.Large, Size.ExtraLarge].includes(props.size),
}));
</script>
