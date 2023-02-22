<template>
  <div><slot /></div>
</template>

<script lang="ts" setup>
defineProps<{
  // eslint-disable-next-line vue/no-unused-properties
  span: number;
}>();
</script>
