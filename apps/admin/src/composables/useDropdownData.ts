import {computed, type ComputedRef, type Ref, ref, toRefs} from 'vue';
import {get} from '@vueuse/core';
import {partitionArray} from '@myparcel/ts-utils';
import {type ActionDefinition, type DropdownButtonProps} from '../types';
import {AdminIcon} from '../data';

interface DropdownActions {
  standalone: ActionDefinition[];
  hidden: ActionDefinition[];
}

interface DropdownData {
  dropdownActions: ComputedRef<DropdownActions>;

  dropdownIcon: ComputedRef<AdminIcon>;

  toggle(value?: boolean): void;

  toggled: Ref<boolean>;
}

export const useDropdownData = (props: DropdownButtonProps): DropdownData => {
  const toggled = ref(false);
  const propRefs = toRefs(props);

  return {
    dropdownActions: computed(() => {
      const [standalone, hidden] = partitionArray(get(propRefs.actions), (action) => action.standalone === true);

      return {
        standalone,
        hidden,
      };
    }),

    dropdownIcon: computed(() => (toggled.value ? AdminIcon.ArrowUp : AdminIcon.ArrowDown)),

    toggle(value) {
      toggled.value = value ?? !toggled.value;
    },

    toggled,
  };
};
