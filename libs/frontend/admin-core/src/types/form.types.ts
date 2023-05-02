import type {ComponentOrHtmlElement, InteractiveElementInstance} from '@myparcel-vfb/core/src';
import type {SelectOption, SelectOptionValue} from '@myparcel-pdk/common/src';
import type {Replace} from '@myparcel/ts-utils';

type FieldProps = {
  description?: string;
  subtext?: string;
};

export type ElementInstance<Props extends Record<string, unknown> = FieldProps> = Replace<
  InteractiveElementInstance<ComponentOrHtmlElement, string>,
  'props',
  Props
>;

export type OptionsProp<T extends SelectOptionValue = SelectOptionValue> = {
  options?: SelectOption<T>[];
};
