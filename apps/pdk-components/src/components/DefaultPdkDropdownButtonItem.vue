<template>
  <span @click.prevent="() => $emit('click', value)">
    <PdkIcon
      v-if="icon"
      :icon="icon" />
    <!-- Content of the dropdown item. -->
    <slot />
  </span>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The child item of a DefaultPdkDropdownButton.
 */
export default defineComponent({
  name: 'DefaultPdkDropdownButtonItem',
  props: {
    /**
     * Optional icon.
     */
    icon: {
      type: String,
      default: null,
    },

    /**
     * Value of the dropdown item.
     */
    value: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['click'],
});
</script>
