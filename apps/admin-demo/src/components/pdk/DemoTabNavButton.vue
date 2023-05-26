<template>
  <button
    :class="{
      'text-gray-600 border-t border-l border-r border-': active,
      'text-gray-500 border-b': !active,
    }"
    class="duration-150 ease-in-out focus:text-gray-700 font-medium hover:text-gray-700 leading-5 px-3 py-2 rounded-tl-lg rounded-tr-lg text-sm transition"
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

<script lang="ts" setup>
import {type PropType} from 'vue';
import {useLanguage} from '@myparcel-pdk/frontend-admin-core';
import {type TabDefinition} from '@myparcel-pdk/common';

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
