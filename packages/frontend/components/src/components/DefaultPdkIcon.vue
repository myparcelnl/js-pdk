<template>
  <i
    :class="`icon-${icon}`"
    class="icon"></i>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DefaultPdkIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>
