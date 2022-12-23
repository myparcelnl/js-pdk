<template>
  <div>
    <p v-text="translate('loading')" />
  </div>
</template>

<script setup lang="ts">
import {useTranslate} from '../composables';

const translate = useTranslate();
</script>
