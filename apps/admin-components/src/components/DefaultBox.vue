<template>
  <PdkLoader v-if="loading" />

  <div v-else>
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

import {Size} from '@myparcel-pdk/common/src';
import {useLanguage} from '@myparcel-pdk/frontend-core/src';

defineProps<{
  /**
   * Used to control loading state.
   */
  loading?: boolean;

  /**
   * Size of the box.
   */
  // eslint-disable-next-line vue/no-unused-properties
  size?: Size;

  /**
   * Title of the box.
   */
  title?: string;
}>();

defineEmits<(event: 'clickHeader') => void>();

const {translate} = useLanguage();
</script>
