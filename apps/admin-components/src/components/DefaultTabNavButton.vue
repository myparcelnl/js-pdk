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

<script setup lang="ts">
import {TabDefinition} from '@myparcel-pdk/common/src';
import {useLanguage} from '@myparcel-pdk/frontend-core/src';

defineProps<{
  // eslint-disable-next-line vue/no-unused-properties
  active?: boolean;
  tab: TabDefinition;
}>();

defineEmits<(event: 'click') => void>();

const {translate} = useLanguage();
</script>
