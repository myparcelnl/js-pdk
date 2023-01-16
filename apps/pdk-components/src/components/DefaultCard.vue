<template>
  <div
    :class="{
      loading: 'opacity-50',
    }">
    <div
      v-if="$slots.header || title"
      @click="$emit('clickHeader')">
      <!-- Card header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div>
      <!-- Card content. -->
      <slot />
    </div>

    <div v-if="$slots.footer || actions.length">
      <!-- Card footer. -->
      <slot name="footer">
        <ActionButton
          v-for="(action, index) in actions"
          :key="`${index}_${action.id}`"
          :disabled="loading"
          :action="action" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {ActionButton, PdkButtonAction, useLanguage} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';

/**
 * A "card" component that can be used to wrap content in a block.
 */
export default defineComponent({
  name: 'DefaultCard',

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
    const {translate} = useLanguage();

    return {
      translate,
    };
  },
});
</script>
