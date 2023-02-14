<template>
  <div
    :class="{
      loading: 'text-muted',
    }"
    class="box">
    <div
      v-if="$slots.header"
      class="box-header">
      <!-- Box header. -->
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div class="box-body">
      <slot />
    </div>

    <div
      v-if="$slots.footer || actions.length"
      class="box-footer">
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
 * @see import('@myparcel-pdk/admin-components').DefaultBox
 */
export default defineComponent({
  name: 'Bootstrap4Box',

  components: {
    ActionButton,
  },

  props: {
    loading: {
      type: Boolean,
    },

    title: {type: String, default: null},

    /**
     * Available actions on the box.
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
