import {isOfType} from '@myparcel-dev/ts-utils';
import {type SelectOption, type SelectOptionValue, type SelectOptionWithLabel} from '../../types';
import {type useLanguage} from '../../composables';

export const translateSelectOption = <T extends SelectOptionValue = SelectOptionValue>(
  option: SelectOption<T>,
  translate: ReturnType<typeof useLanguage>['translate'],
): SelectOptionWithLabel<T, string> => {
  const hasLabel = isOfType<SelectOptionWithLabel>(option, 'label');
  const translatedOption = {...option} as SelectOptionWithLabel<T>;

  translatedOption.label = hasLabel ? translate(option.label) : option.plainLabel;

  return Object.freeze(translatedOption) as SelectOptionWithLabel<T, string>;
};
