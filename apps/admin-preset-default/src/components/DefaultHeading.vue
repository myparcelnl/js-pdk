<template>
  <component :is="`h${level}`">
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps<{
  level: number;
}>();
</script>
