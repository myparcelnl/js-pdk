<template>
  <div
    :class="{
      loading: 'opacity-50',
    }">
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

    <div v-if="$slots.footer || actions.length">
      <!-- Box footer. -->
      <slot name="footer">
        <ActionButton
          v-for="(action, index) in actions"
          :key="`${index}_${action.id}`"
          :action="action"
          :disabled="loading" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {ActionButton, ResolvedAction, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';

/**
 * A "box" component that can be used to wrap content in a block.
 */
export default defineComponent({
  name: 'DefaultBox',

  components: {
    ActionButton,
  },

  props: {
    /**
     * Used to control loading state.
     */
    loading: {
      type: Boolean,
    },

    /**
     * Title of the box.
     */
    title: {
      type: String,
      default: null,
    },

    /**
     * Available actions on the box.
     */
    actions: {
      type: Array as PropType<ResolvedAction[]>,
      default: () => [],
    },
  },

  emits: ['clickHeader'],

  setup: () => {
    const {translate} = useLanguage();

    return {
      translate,
    };
  },
});
</script>
