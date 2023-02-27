import type {ComponentOrHtmlElement, InteractiveElementInstance} from '@myparcel-vfb/core/src';
import {Replace} from '@myparcel/ts-utils';

export type ElementInstance<Props extends Record<string, unknown> = Record<string, unknown>> = Replace<
  InteractiveElementInstance<ComponentOrHtmlElement, string>,
  'props',
  Props
>;
