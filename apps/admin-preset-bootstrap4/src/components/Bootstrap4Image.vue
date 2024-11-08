<template>
  <img
    v-test="AdminComponent.Image"
    :alt="alt"
    :height="height"
    :src="src"
    :title="title"
    :width="width"
    class="img-responsive" />
</template>

<script lang="ts" setup>
import {AdminComponent, type ImageProps} from '@myparcel-pdk/admin';

defineProps<ImageProps>();
</script>
