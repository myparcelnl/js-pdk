import {ComputedRef, Ref, computed, ref} from 'vue';
import {ActionDefinition} from '../types';
import {partitionArray} from '@myparcel/ts-utils';

type UseDropdownData = (actions: ActionDefinition[]) => {
  toggle(value?: boolean): void;

  toggled: Ref<boolean>;

  dropdownActions: ComputedRef<{
    standalone: ActionDefinition[];
    hidden: ActionDefinition[];
  }>;
};

export const useDropdownData: UseDropdownData = (actions) => {
  const toggled = ref(false);

  return {
    dropdownActions: computed(() => {
      const [standalone, hidden] = partitionArray(actions, (action) => action.standalone === true);

      return {
        standalone,
        hidden,
      };
    }),

    toggled,

    toggle(value) {
      toggled.value = value ?? !toggled.value;
    },
  };
};
