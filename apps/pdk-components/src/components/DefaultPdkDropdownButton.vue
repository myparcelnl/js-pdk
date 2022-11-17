<template>
  <PdkButton
    :aria-expanded="toggled"
    :disabled="disabled"
    aria-haspopup="true"
    @focus="toggled = true"
    @focusout="toggled = false"
    @mouseout="toggled = false"
    @mouseover="toggled = true">
    <!-- Dropdown button item content. -->
    <slot><span v-text="translate('toggle_dropdown')" /></slot>
    <div v-show="toggled">
      <PdkDropdownButtonItem
        v-for="(option, index) in options"
        :key="`${index}_${option.label}`"
        :icon="option.icon"
        :variant="option.variant"
        @click="() => $emit('click', option.action)">
        {{ translate(option.label) }}
      </PdkDropdownButtonItem>
    </div>
  </PdkButton>
</template>

<script lang="ts">
import {PropType, defineComponent, ref} from 'vue';
import {DropdownButtonItem} from '@myparcel-pdk/common';
import {useTranslate} from '@myparcel-pdk/frontend-core';

/**
 * This component is used to render a dropdown button. The dropdown button is a
 * button that can be clicked to open a dropdown menu. The dropdown menu can
 * contain multiple items.
 */
export default defineComponent({
  name: 'DefaultPdkDropdownButton',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * List of options.
     */
    options: {
      type: Array as PropType<DropdownButtonItem[]>,
      default: (): never[] => [],
    },
  },

  emits: ['click'],

  setup: () => {
    const toggled = ref(false);

    return {
      translate: useTranslate(),
      toggle: () => {
        toggled.value = !toggled.value;
      },

      toggled,
    };
  },
});
</script>
