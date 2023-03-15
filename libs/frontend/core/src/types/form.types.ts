import type {ComponentOrHtmlElement, InteractiveElementInstance} from '@myparcel-vfb/core/src';
import type {Replace} from '@myparcel/ts-utils';
import type {SelectOption} from '@myparcel-pdk/common/src';

export type ElementInstance<Props extends Record<string, unknown> = Record<string, unknown>> = Replace<
  InteractiveElementInstance<ComponentOrHtmlElement, string>,
  'props',
  Props
>;

export type OptionsProp<T = string | number> = {
  options?: SelectOption<T>[];
};
