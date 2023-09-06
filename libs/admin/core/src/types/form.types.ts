import {type AdminIcon, type Keyable, type SelectOption, type SelectOptionValue} from '@myparcel-pdk/admin-common';
import {
  type ComponentOrHtmlElement,
  type ElementName,
  type InteractiveElementInstance,
} from '@myparcel/vue-form-builder';
import {type Replace} from '@myparcel/ts-utils';

export type ArrayItem<T> = T extends (infer U)[] ? U : T;

type FieldProps = {
  description?: string;
  subtext?: string;
  value?: unknown;
};

export type ElementInstance<
  Props extends Record<string, unknown> = Record<string, unknown>,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = string,
  RT = unknown,
> = Replace<InteractiveElementInstance<C, N, RT>, 'props', Props & FieldProps & Record<string, unknown>>;

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
