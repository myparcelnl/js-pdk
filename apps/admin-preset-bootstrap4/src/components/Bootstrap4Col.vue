<template>
  <div class="col">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  // eslint-disable-next-line vue/no-unused-properties
  span?: number;
}>();
</script>
