<template>
  <ActionButton
    v-for="action in dropdownActions.standalone"
    :key="action.id"
    :action="action" />

  <PdkButton
    :aria-expanded="toggled"
    :aria-label="translate('toggle_dropdown')"
    :disabled="disabled"
    aria-haspopup="true"
    @focus="toggled = true"
    @focusout="toggled = false"
    @mouseout="toggled = false"
    @mouseover="toggled = true" />

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
import {ActionButton, ResolvedAction, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultDropdownButton
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
