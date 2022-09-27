<template>
  <div>
    <p v-text="translate('Your label(s) are being generated... Please wait. Do not close this page.')" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'LoadingPage',

  setup: () => {
    return {
      translate: useTranslate(),
    };
  },
});
</script>
