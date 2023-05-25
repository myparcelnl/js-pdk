import {AdminIcon} from '@myparcel-pdk/frontend-admin-core';
import {Component} from 'vue';
import {Keyable} from './generic.types';

export type LabelFormat = 'a4' | 'a6';

export type LabelOutput = 'open' | 'download';

type LabelPositionNumber = 1 | 2 | 3 | 4;

export type LabelPosition = LabelPositionNumber | `${LabelPositionNumber}`;

interface BaseSelectOption<Value extends SelectOptionValue = SelectOptionValue> {
  disabled?: boolean;
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

export type RadioGroupOption<Value extends Keyable = Keyable> = SelectOption<Value> & {
  image?: string;
  icon?: AdminIcon;
};

export interface TabDefinition {
  component: string | Component;
  description?: string;
  icon?: string;
  label: string;
  name: string;
  subtext?: string;
}

export type WebhookDefinition = {
  connected: boolean;
  hook: string;
  url: null | string;
};
