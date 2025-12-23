import {computed, type ComputedRef, type Ref, ref, toRefs, toValue} from 'vue';
import {partitionArray} from '@myparcel-dev/ts-utils';
import {type ActionDefinition, type DropdownButtonProps} from '../../types';
import {AdminIcon} from '../../data';

interface DropdownActions {
  standalone: ActionDefinition[];
  hidden: ActionDefinition[];
}

interface DropdownData {
  dropdownActions: ComputedRef<DropdownActions>;

  dropdownIcon: ComputedRef<AdminIcon>;
  toggled: Ref<boolean>;

  toggle(value?: boolean): void;
}

export const useDropdownButtonContext = (props: DropdownButtonProps): DropdownData => {
  const toggled = ref(false);
  const propRefs = toRefs(props);

  return {
    dropdownActions: computed(() => {
      const [standalone, hidden] = partitionArray(toValue(propRefs.actions), (action) => action.standalone === true);

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
