<template>
  <div class="border mb-4 overflow-hidden rounded-xl">
    <div
      v-if="$slots.header || title"
      class="bg-zinc-50 border-newItem font-bold px-4 py-2 text-lg"
      @click="$emit('clickHeader')">
      <!-- Card header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div class="p-4">
      <!-- Card content. -->
      <slot />
    </div>

    <div
      v-if="$slots.footer || actions.length"
      class="d-flex p-4">
      <!-- Card footer. -->
      <slot name="footer">
        <PdkButton
          v-for="(action, index) in actions"
          :key="`${index}_${action.id}`"
          v-bind="action" />
      </slot>
    </div>
    <!--    <LoaderOverlay :show="loading" /> -->
  </div>
</template>

<script lang="ts">
import {PdkButtonAction, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

/**
 * A "card" component that can be used to wrap content in a block.
 */
export default defineComponent({
  name: 'DefaultPdkCard',
  props: {
    /**
     * Used to control loading state.
     */
    loading: {
      type: Boolean,
    },

    /**
     * Title of the card.
     */
    title: {
      type: String,
      default: null,
    },

    /**
     * Available actions on the card.
     */
    actions: {
      type: Array as PropType<PdkButtonAction[]>,
      default: () => [],
    },
  },

  emits: ['clickHeader'],

  setup: () => {
    return {
      translate: useTranslate(),
    };
  },
});
</script>
