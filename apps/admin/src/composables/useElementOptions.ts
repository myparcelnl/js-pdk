import {computed, type ComputedRef, type UnwrapRef} from 'vue';
import {SortType} from '@myparcel-pdk/common';
import {translateSelectOption} from '../utils';
import {type SelectInputModelValue, type SelectInputProps, type SelectOptionWithLabel} from '../types';
import {useLanguage} from './language';

export interface ElementOptionsContext<T extends SelectInputModelValue> {
  options: ComputedRef<SelectOptionWithLabel<UnwrapRef<T>>[]>;
}

export const useElementOptions = <
  T extends SelectInputModelValue = SelectInputModelValue,
  Props extends SelectInputProps<T> = SelectInputProps<T>,
>(
  props: Props,
): ElementOptionsContext<T> => {
  const {translate} = useLanguage();

  const sort = computed<SortType | undefined>(() => props.element.props.sort);

  const options = computed(() => {
    return (props.element.props.options ?? [])
      .map((option) => translateSelectOption(option, translate))
      .sort((a, b) => {
        if (b.value === -1) {
          return 1;
        }

        switch (sort.value) {
          case SortType.Ascending:
            return a.label.localeCompare(b.label);

          case SortType.Descending:
            return b.label.localeCompare(a.label);
        }

        return 0;
      });
  });

  return {options};
};
