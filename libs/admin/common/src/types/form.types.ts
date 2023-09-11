import {type Keyable} from '@myparcel-pdk/common';
import {type AdminIcon} from './common.types';

interface BaseSelectOption<Value extends SelectOptionValue = SelectOptionValue> {
  disabled?: boolean;
  icon?: string | AdminIcon;
  image?: string;
  value: Value;
}

export interface SelectOptionWithLabel<Value extends SelectOptionValue = SelectOptionValue>
  extends BaseSelectOption<Value> {
  label: string;
}

export interface SelectOptionWithPlainLabel<Value extends SelectOptionValue = SelectOptionValue>
  extends BaseSelectOption<Value> {
  plainLabel: string;
}

export type SelectOptionValue = Keyable | boolean;

export type SelectOption<Value extends SelectOptionValue = SelectOptionValue> =
  | SelectOptionWithLabel<Value>
  | SelectOptionWithPlainLabel<Value>;
