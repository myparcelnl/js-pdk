<template>
  <PdkButton
    v-for="button in standaloneOptions"
    :key="button.label"
    v-bind="button" />

  <PdkButton
    :aria-expanded="toggled"
    :disabled="disabled"
    aria-haspopup="true"
    :aria-label="translate('toggle_dropdown')"
    @focus="toggled = true"
    @focusout="toggled = false"
    @mouseout="toggled = false"
    @mouseover="toggled = true">
  </PdkButton>

  <div v-show="toggled">
    <PdkButton
      v-for="(option, index) in dropdownOptions"
      :key="`${index}_${option.label}`"
      v-bind="option">
      {{ translate(option.label) }}
    </PdkButton>
  </div>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, ref, toRefs} from 'vue';
import {PdkDropdownAction, useTranslate} from '@myparcel-pdk/frontend-core';

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
      type: Array as PropType<PdkDropdownAction[]>,
      default: (): never[] => [],
    },
  },

  emits: ['click'],

  setup: (props) => {
    const propRefs = toRefs(props);
    const toggled = ref(false);

    return {
      translate: useTranslate(),
      toggle: () => {
        toggled.value = !toggled.value;
      },

      toggled,

      standaloneOptions: computed(() => propRefs.options.value.filter((option) => option.standalone)),
      dropdownOptions: computed(() => propRefs.options.value.filter((option) => !option.standalone)),
    };
  },
});
</script>
