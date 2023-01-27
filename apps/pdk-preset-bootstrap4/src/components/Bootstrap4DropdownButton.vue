<template>
  <div class="btn-group">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="`dropdown_${action.id}`"
      class="btn-sm"
      :action="action" />

    <PdkButton
      class="btn-sm dropdown-toggle dropdown-toggle-split"
      :disabled="disabled"
      :aria-label="translate('toggle_dropdown')"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false" />

    <div class="dropdown-menu">
      <BaseButton
        v-for="(action, index) in dropdownActions.hidden"
        :key="`${index}_${action.label}`"
        class="dropdown-item"
        :disabled="action.disabled"
        :icon="action.icon"
        :label="action.label" />
    </div>
  </div>
</template>

<script lang="ts">
import {ActionButton, useDropdownData, useLanguage} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';
import BaseButton from './common/BaseButton.vue';
import {ResolvedAction} from '@myparcel-pdk/frontend-core';

/**
 * @see import('@myparcel/pdk-components').DefaultDropdownButton
 */
export default defineComponent({
  name: 'Bootstrap4DropdownButton',
  components: {BaseButton, ActionButton},
  props: {
    disabled: {
      type: Boolean,
    },

    actions: {
      type: Array as PropType<ResolvedAction[]>,
      required: true,
    },
  },

  emits: ['click'],

  setup: (props) => {
    const {translate} = useLanguage();
    const dropdownData = useDropdownData(props.actions);

    return {
      translate,
      ...dropdownData,
    };
  },
});
</script>
