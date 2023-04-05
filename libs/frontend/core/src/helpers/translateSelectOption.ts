import {SelectOption, SelectOptionValue, SelectOptionWithLabel} from '@myparcel-pdk/common/src';
import {isOfType} from '@myparcel/ts-utils';
import {useLanguage} from '../composables';

export const translateSelectOption = <T extends SelectOptionValue = SelectOptionValue>(
  option: SelectOption<T>,
  translate: ReturnType<typeof useLanguage>['translate'],
): SelectOptionWithLabel<T> => {
  const hasLabel = isOfType<SelectOptionWithLabel>(option, 'label');
  const translatedOption = option as SelectOptionWithLabel<T>;

  translatedOption.label = hasLabel ? translate(option.label) : translate(option.plainLabel);

  return translatedOption;
};
