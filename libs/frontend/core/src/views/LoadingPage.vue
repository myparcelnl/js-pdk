<template>
  <div>
    <p v-text="translate('loading')" />
  </div>
</template>

<script setup lang="ts">
import {useLanguage} from '../composables';

const translate = useLanguage();
</script>
