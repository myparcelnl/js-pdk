import {ComponentOrHtmlElement, InteractiveElementInstance} from '@myparcel-vfb/core/src';
import {Keyable, SelectOption, SelectOptionValue} from '@myparcel-pdk/common/src';
import {Replace} from '@myparcel/ts-utils';

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
