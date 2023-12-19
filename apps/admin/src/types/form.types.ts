import {type Keyable, type SortType} from '@myparcel-pdk/common';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AdminIcon} from '../data';
import {type Translation} from './language.types';

export type GlobalFieldProps = {
  description?: Translation;
  subtext?: Translation;
  value?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ElementInstance<Type = unknown, Props = any> = InteractiveElementInstance<
  Type,
  Props & GlobalFieldProps & Record<string, unknown>
>;

export type OptionsProp<T extends SelectOptionValue = SelectOptionValue> = {
  options?: SelectOption<T>[];
  sort?: SortType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PdkElementProps<ModelValue extends unknown = Keyable, Props = any> = {
  element: ElementInstance<ModelValue, Props>;
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
