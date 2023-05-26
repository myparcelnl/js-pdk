import {type ComponentOrHtmlElement, type InteractiveElementInstance} from '@myparcel-vfb/core';
import {type Keyable, type SelectOption, type SelectOptionValue} from '@myparcel-pdk/common';
import {type Replace} from '@myparcel/ts-utils';
import {type AdminIcon} from './common.types';

export type ArrayItem<T> = T extends (infer U)[] ? U : T;

type FieldProps = {
  description?: string;
  subtext?: string;
  value?: unknown;
};

export type ElementInstance<Props extends Record<string, unknown> = Record<string, unknown>> = Replace<
  InteractiveElementInstance<ComponentOrHtmlElement, string>,
  'props',
  Props & FieldProps & Record<string, unknown>
>;

export type OptionsProp<T extends SelectOptionValue = SelectOptionValue> = {
  options?: SelectOption<T>[];
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
