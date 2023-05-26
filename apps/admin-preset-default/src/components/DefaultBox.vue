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

    <div v-if="$slots.footer || actions?.length">
      <!-- Box footer. -->
      <slot name="footer">
        <PdkButtonGroup v-if="actions?.length">
          <ActionButton
            v-for="action in actions"
            :key="action.id"
            :action="action" />
        </PdkButtonGroup>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * A "box" component that can be used to wrap content in a block.
 */

import {type PropType} from 'vue';
import {ActionButton, type ActionDefinition, useLanguage} from '@myparcel-pdk/frontend-admin-core';
import {Size} from '@myparcel-pdk/common';

defineProps({
  /**
   * Actions that can be performed on the box.
   */
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
  },

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
