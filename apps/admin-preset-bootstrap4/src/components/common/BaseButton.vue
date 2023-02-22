<template>
  <button
    :disabled="disabled"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      :icon="icon"
      class="mr-1" />
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import {AdminIcon, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType} from 'vue';

defineProps({
  disabled: {
    type: Boolean,
  },

  icon: {
    type: String as PropType<AdminIcon>,
    default: null,
  },

  label: {
    type: String,
    default: 'action_save',
  },
});

defineEmits<(event: 'click') => void>();

const {translate} = useLanguage();
</script>
