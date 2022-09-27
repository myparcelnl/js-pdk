<template>
  <span @click.prevent="() => $emit('click', value)">
    <PdkIcon
      v-if="icon"
      :icon="icon" />
    <slot />
  </span>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';

export default defineComponent({
  name: 'DefaultPdkDropdownButtonItem',
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: null,
    },

    icon: {
      type: String,
      default: null,
    },

    value: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['click'],
});
</script>
