import {SelectOption, SelectOptionWithLabel, SelectOptionWithPlainLabel} from '@myparcel-pdk/common/src';
import {isOfType} from '@myparcel/ts-utils';
import {useLanguage} from '../composables';

export const translateSelectOption = <T = string | number>(
  option: SelectOption<T>,
  translate: ReturnType<typeof useLanguage>['translate'],
): SelectOptionWithLabel<T> => {
  const hasLabel = isOfType<SelectOptionWithLabel>(option, 'label');

  return {
    value: option.value,
    label: hasLabel ? translate(option.label) : (option as SelectOptionWithPlainLabel<T>).plainLabel,
  };
};
