import {computed, type ComputedRef, type Ref, ref, toRefs} from 'vue';
import {get} from '@vueuse/core';
import {AdminIcon} from '@myparcel-pdk/admin-common';
import {partitionArray} from '@myparcel/ts-utils';
import {type AnyActionDefinition} from '../types';

type DropdownProps = {
  actions: AnyActionDefinition[];
};

type DropdownData = {
  dropdownActions: ComputedRef<{
    standalone: AnyActionDefinition[];
    hidden: AnyActionDefinition[];
  }>;

  dropdownIcon: ComputedRef<AdminIcon>;

  toggle(value?: boolean): void;

  toggled: Ref<boolean>;
};

type UseDropdownData = (props: DropdownProps) => DropdownData;

export const useDropdownData: UseDropdownData = (props) => {
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
