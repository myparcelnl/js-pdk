<template>
  <button
    :class="{
      'text-zinc-600 border-t border-l border-r border-': active,
      'text-zinc-500 border-b mx-px': !active,
    }"
    class="border-zinc-500 duration-150 ease-in-out focus:text-zinc-700 font-medium hover:text-zinc-700 leading-5 px-3 py-2 rounded-tl-lg rounded-tr-lg text-sm transition"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="tab.icon"
      :icon="tab.icon" />
    <!-- Button content. Can be used instead of `label` prop. -->
    <slot>
      {{ translate(tab.name) }}
    </slot>
  </button>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {PdkTab} from '@myparcel-pdk/common/src';
import {useLanguage} from '@myparcel-pdk/frontend-core/src';

export default defineComponent({
  name: 'DemoTabNavButton',
  props: {
    active: {
      type: Boolean,
    },

    tab: {
      type: Object as PropType<PdkTab>,
      required: true,
    },
  },

  emits: ['click'],

  setup: () => {
    const {translate} = useLanguage();

    return {
      translate,
    };
  },
});
</script>
