<template>
  <div class="btn-group">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="`dropdown_${action.id}`"
      :action="action"
      class="btn-sm" />

    <PdkButton
      :aria-label="translate('toggle_dropdown')"
      :disabled="disabled"
      aria-expanded="false"
      aria-haspopup="true"
      class="btn-sm dropdown-toggle dropdown-toggle-split"
      data-toggle="dropdown" />

    <div class="dropdown-menu">
      <BaseButton
        v-for="(action, index) in dropdownActions.hidden"
        :key="`${index}_${action.label}`"
        :disabled="action.disabled"
        :icon="action.icon"
        :label="action.label"
        class="dropdown-item" />
    </div>
  </div>
</template>

<script lang="ts">
import {ActionButton, ResolvedAction, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';
import BaseButton from './common/BaseButton.vue';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultDropdownButton
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
