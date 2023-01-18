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
import {PdkTab} from '@myparcel-pdk/common';
import {useLanguage} from '@myparcel/pdk-frontend';

export default defineComponent({
  name: 'DefaultTabNavButton',
  props: {
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
