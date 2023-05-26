<template>
  <button
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="tab.icon"
      :icon="tab.icon" />
    {{ translate(tab.label) }}
  </button>
</template>

<script lang="ts" setup>
import {type PropType} from 'vue';
import {useLanguage} from '@myparcel-pdk/frontend-admin-core';
import {type TabDefinition} from '@myparcel-pdk/common';

defineProps({
  // eslint-disable-next-line vue/no-unused-properties
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
