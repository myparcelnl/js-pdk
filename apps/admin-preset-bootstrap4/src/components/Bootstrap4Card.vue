<template>
  <div
    :class="{
      loading: 'text-muted',
    }"
    class="card">
    <div
      v-if="$slots.header"
      class="card-header">
      <!-- Card header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div class="card-body">
      <slot />
    </div>

    <div
      v-if="$slots.footer || actions.length"
      class="card-footer">
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
import {ActionButton, ResolvedAction, useLanguage} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultCard
 */
export default defineComponent({
  name: 'Bootstrap4Card',

  components: {
    ActionButton,
  },

  props: {
    loading: {
      type: Boolean,
    },

    title: {type: String, default: null},

    /**
     * Available actions on the card.
     */
    actions: {
      type: Array as PropType<ResolvedAction[]>,
      default: () => [],
    },
  },

  setup: () => {
    const {translate} = useLanguage();

    return {
      translate,
    };
  },
});
</script>
