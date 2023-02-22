<template>
  <div
    :class="{
      'opacity-50': loading,
    }"
    class="border mb-4 overflow-hidden rounded-xl">
    <div
      v-if="$slots.header || title"
      class="bg-zinc-50 border-newItem font-bold px-4 py-2 text-lg"
      @click="$emit('clickHeader')">
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div class="p-4">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="d-flex p-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useLanguage} from '@myparcel-pdk/frontend-core/src';

defineProps<{
  loading?: boolean;
  title?: string;
}>();

defineEmits<(event: 'clickHeader') => void>();

const {translate} = useLanguage();
</script>
