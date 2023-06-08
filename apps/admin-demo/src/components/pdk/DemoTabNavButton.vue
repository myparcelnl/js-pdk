<template>
  <button
    :class="{
      'text-gray-600 border-t border-l border-r border-': active,
      'text-gray-500 border-b': !active,
    }"
    class="duration-150 ease-in-out focus:text-gray-700 font-medium hover:text-gray-700 leading-5 px-3 py-2 rounded-tl-lg rounded-tr-lg text-sm transition"
    type="button"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{active: boolean}>();
defineEmits<(event: 'click') => void>();
</script>
