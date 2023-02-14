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

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {TabDefinition} from '@myparcel-pdk/common/src';
import {useLanguage} from '@myparcel-pdk/frontend-core/src';

export default defineComponent({
  name: 'DefaultTabNavButton',
  props: {
    tab: {
      type: Object as PropType<TabDefinition>,
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
