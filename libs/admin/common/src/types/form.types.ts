import {type Keyable} from '@myparcel-pdk/common';
import {type Translation} from './language.types';
import {type AdminIcon} from './common.types';

interface BaseSelectOption<Value extends SelectOptionValue = SelectOptionValue> {
  disabled?: boolean;
  icon?: string | AdminIcon;
  image?: string;
  value: Value;
}

export interface SelectOptionWithLabel<Value extends SelectOptionValue = SelectOptionValue>
  extends BaseSelectOption<Value> {
  label: Translation;
}

export interface SelectOptionWithPlainLabel<Value extends SelectOptionValue = SelectOptionValue>
  extends BaseSelectOption<Value> {
  plainLabel: Translation;
}

export type SelectOptionValue = Keyable | boolean;

export type SelectOption<Value extends SelectOptionValue = SelectOptionValue> =
  | SelectOptionWithLabel<Value>
  | SelectOptionWithPlainLabel<Value>;
