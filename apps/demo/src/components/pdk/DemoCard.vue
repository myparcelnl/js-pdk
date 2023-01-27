<template>
  <div
    class="border mb-4 overflow-hidden rounded-xl"
    :class="{
      loading: 'opacity-50',
    }">
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
import {ActionButton, GenericAction, useLanguage} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultCard
 */
export default defineComponent({
  name: 'DemoCard',

  components: {
    ActionButton,
  },

  props: {
    loading: {
      type: Boolean,
    },

    title: {
      type: String,
      default: null,
    },

    actions: {
      type: Array as PropType<GenericAction[]>,
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
