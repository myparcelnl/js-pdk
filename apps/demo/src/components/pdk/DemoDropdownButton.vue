<template>
  <ActionButton
    v-for="action in dropdownActions.standalone"
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
      v-for="(action, index) in dropdownActions.hidden"
      :key="`${index}_${action.id}`"
      :action="action">
      {{ translate(action.label) }}
    </ActionButton>
  </div>
</template>

<script lang="ts">
import {ActionButton, useDropdownData, useLanguage} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';
import {ResolvedAction} from '@myparcel-pdk/frontend-core';

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
      type: Array as PropType<ResolvedAction[]>,
      default: (): never[] => [],
    },
  },

  emits: ['click'],

  setup: (props) => {
    const {translate} = useLanguage();

    return {
      translate,
      ...useDropdownData(props.actions),
    };
  },
});
</script>
