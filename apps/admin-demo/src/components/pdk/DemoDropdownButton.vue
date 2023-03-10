<template>
  <div
    v-test="'DropdownButton'"
    class="flex">
    <ActionButton
      v-for="(action, index) in dropdownActions.standalone"
      :key="action.id"
      :action="action"
      :class="{
        'rounded-r-none': index === dropdownActions.standalone.length - 1,
      }"
      :hide-text="hideText"
      :size="size" />

    <PdkButton
      v-if="dropdownActions.hidden.length > 0"
      :aria-expanded="toggled"
      :aria-label="translate('toggle_dropdown')"
      :class="{
        'rounded-l-none border-l-0': dropdownActions.standalone.length > 0,
      }"
      :disabled="disabled"
      :icon="dropdownIcon"
      :size="size"
      aria-haspopup="true"
      class="relative"
      @focus="toggled = true"
      @focusout="toggled = false"
      @mouseout="toggled = false"
      @mouseover="toggled = true">
      <div
        v-show="toggled"
        class="absolute bg-white border border-solid flex flex-col right-0 rounded top-full z-50">
        <ActionButton
          v-for="(action, index) in dropdownActions.hidden"
          :key="`${index}_${action.id}`"
          v-test="'HiddenDropdownAction'"
          :action="action"
          class="bg-transparent border-none text-left">
          {{ translate(action.label) }}
        </ActionButton>
      </div>
    </PdkButton>
  </div>
</template>

<script lang="ts" setup>
import {ActionButton, ActionDefinition, AdminIcon, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, computed} from 'vue';
import {Size} from '@myparcel-pdk/common/src';

const props = defineProps({
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
  },

  size: {
    type: String as PropType<Size>,
    default: 'sm',
  },

  disabled: {
    type: Boolean,
  },

  hideText: {
    type: Boolean,
  },
});

defineEmits(['click']);

const {dropdownActions, toggled} = useDropdownData(props.actions);

const dropdownIcon = computed(() => (toggled.value ? AdminIcon.ArrowUp : AdminIcon.ArrowDown));

const {translate} = useLanguage();
</script>
