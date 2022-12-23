<template>
  <div class="btn-group">
    <ActionButton
      v-for="action in standaloneActions"
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
        v-for="(action, index) in dropdownActions"
        :key="`${index}_${action.label}`"
        class="dropdown-item"
        :disabled="action.disabled"
        :icon="action.icon"
        :label="action.label" />
    </div>
  </div>
</template>

<script lang="ts">
import {ActionButton, PdkDropdownAction, useTranslate} from '@myparcel/pdk-frontend';
import {PropType, computed, defineComponent, toRefs} from 'vue';
import BaseButton from './common/BaseButton.vue';

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
      type: Array as PropType<PdkDropdownAction[]>,
      required: true,
    },
  },

  emits: ['click'],

  setup: (props) => {
    const propRefs = toRefs(props);

    return {
      translate: useTranslate(),
      standaloneActions: computed(() => propRefs.actions.value.filter((option) => option.standalone)),

      dropdownActions: computed(() => propRefs.actions.value.filter((option) => !option.standalone)),
    };
  },
});
</script>
