<template>
  <PdkLoader v-if="loading" />

  <div
    v-else
    v-test="AdminComponent.Box">
    <div
      v-if="$slots.header || title"
      @click="$emit('clickHeader')">
      <!-- Box header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div>
      <!-- Box content. -->
      <slot />
    </div>

    <div v-if="$slots.footer">
      <!-- Box footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * A "box" component that can be used to wrap content in a block.
 */

import {type PropType} from 'vue';
import {AdminComponent, Size, useLanguage} from '@myparcel-pdk/admin';

defineProps({
  /**
   * Used to control loading state.
   */
  loading: {
    type: Boolean,
  },

  /**
   * Size of the box.
   */
  // eslint-disable-next-line vue/no-unused-properties
  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },

  /**
   * Title of the box.
   */
  title: {
    type: String,
    default: null,
  },
});

defineEmits<(event: 'clickHeader') => void>();

const {translate} = useLanguage();
</script>
