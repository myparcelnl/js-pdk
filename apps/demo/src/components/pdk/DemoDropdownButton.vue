<template>
  <ActionButton
    v-for="action in standaloneActions"
    :key="action.id"
    :action="action" />

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
    <ActionButton
      v-for="(action, index) in dropdownActions"
      :key="`${index}_${action.id}`"
      :action="action">
      {{ translate(action.label) }}
    </ActionButton>
  </div>
</template>

<script lang="ts">
import {ActionButton, PdkDropdownAction, useLanguage} from '@myparcel/pdk-frontend';
import {PropType, computed, defineComponent, ref} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultDropdownButton
 */
export default defineComponent({
  name: 'DemoDropdownButton',

  components: {
    ActionButton: ActionButton,
  },

  props: {
    disabled: {
      type: Boolean,
    },

    actions: {
      type: Array as PropType<PdkDropdownAction[]>,
      default: (): never[] => [],
    },
  },

  emits: ['click'],

  setup: (props) => {
    const toggled = ref(false);
    const {translate} = useLanguage();

    return {
      translate: translate,
      toggle: () => {
        toggled.value = !toggled.value;
      },

      toggled,

      standaloneActions: computed(() => props.actions.filter((option) => option.standalone)),
      dropdownActions: computed(() => props.actions.filter((option) => !option.standalone)),
    };
  },
});
</script>
