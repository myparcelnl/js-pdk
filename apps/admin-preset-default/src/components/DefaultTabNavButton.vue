<template>
  <button
    type="button"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts" setup>
// eslint-disable-next-line vue/no-unused-properties
defineProps<{active: boolean}>();
defineEmits<(event: 'click') => void>();
</script>
