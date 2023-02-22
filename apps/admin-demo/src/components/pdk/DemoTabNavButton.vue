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
    <slot>
      {{ translate(tab.name) }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import {PropType} from 'vue';
import {TabDefinition} from '@myparcel-pdk/common/src';
import {useLanguage} from '@myparcel-pdk/frontend-core/src';

defineProps({
  active: {
    type: Boolean,
  },

  tab: {
    type: Object as PropType<TabDefinition>,
    required: true,
  },
});

defineEmits(['click']);

const {translate} = useLanguage();
</script>
