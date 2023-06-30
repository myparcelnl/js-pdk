<template>
  <span v-test="AdminComponent.Badge">&nbsp;(<slot />)</span>
</template>

<script lang="ts" setup>
import {AdminComponent} from '@myparcel-pdk/common';
</script>
