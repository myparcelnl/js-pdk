<template>
  <div>
    <p v-text="translate('Your label(s) are being generated... Please wait. Do not close this page.')" />
  </div>
</template>

<script setup lang="ts">
import {useTranslate} from '../composables';

const translate = useTranslate();
</script>
