import {type Keyable} from '@myparcel-pdk/common';
import {
  type ComponentOrHtmlElement,
  type ElementName,
  type InteractiveElementInstance,
} from '@myparcel/vue-form-builder';
import {type Replace} from '@myparcel/ts-utils';
import {type SortType} from '../data';
import {type Translation} from './language.types';
import {type AdminIcon} from './common.types';

export type GlobalFieldProps = {
  description?: Translation;
  subtext?: Translation;
  value?: unknown;
};

export type ElementInstance<
  Props extends Record<string, unknown> = Record<string, unknown>,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = string,
  RT = unknown,
> = Replace<InteractiveElementInstance<C, N, RT>, 'props', Props & GlobalFieldProps & Record<string, unknown>>;

export type OptionsProp<T extends SelectOptionValue = SelectOptionValue> = {
  options?: SelectOption<T>[];
  sort?: SortType;
};

export type PdkElementProps<
  ModelValue extends unknown = Keyable,
  Props extends Record<string, unknown> = Record<string, unknown>,
> = {
  element: ElementInstance<Props>;
  modelValue: ModelValue;
};

export type PdkElementEmits<ModelValue extends unknown = Keyable> = (
  event: 'update:modelValue',
  value: ModelValue,
) => void;

export type RadioGroupOption<Value extends Keyable = Keyable> = SelectOption<Value> & {
  image?: string;
  icon?: AdminIcon;
};

interface BaseSelectOption<Value extends SelectOptionValue = SelectOptionValue> {
  disabled?: boolean;
  icon?: string | AdminIcon;
  image?: string;
  value: Value;
}

export interface SelectOptionWithLabel<
  Value extends SelectOptionValue = SelectOptionValue,
  T extends Translation = Translation,
> extends BaseSelectOption<Value> {
  label: T;
}

export interface SelectOptionWithPlainLabel<
  Value extends SelectOptionValue = SelectOptionValue,
  T extends Translation = Translation,
> extends BaseSelectOption<Value> {
  plainLabel: T;
}

export type SelectOptionValue = Keyable | boolean;

export type SelectOption<Value extends SelectOptionValue = SelectOptionValue> =
  | SelectOptionWithLabel<Value>
  | SelectOptionWithPlainLabel<Value>;
