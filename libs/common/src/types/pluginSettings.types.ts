import {Component} from 'vue';

export type LabelFormat = 'a4' | 'a6';

export type LabelOutput = 'open' | 'download';

type LabelPositionNumber = 1 | 2 | 3 | 4;

export type LabelPosition = LabelPositionNumber | `${LabelPositionNumber}`;

interface BaseSelectOption<Value = string | number> {
  disabled?: boolean;
  value: Value;
}

export interface SelectOptionWithLabel<Value = string | number> extends BaseSelectOption<Value> {
  label: string;
}

export interface SelectOptionWithPlainLabel<Value = string | number> extends BaseSelectOption<Value> {
  plainLabel: string;
}

export type SelectOption<Value = string | number> = SelectOptionWithLabel<Value> | SelectOptionWithPlainLabel<Value>;

export interface TabDefinition {
  name: string;
  label: string;
  description?: string;
  icon?: string;
  component: string | Component;
}

export type WebhookDefinition = {
  connected: boolean;
  hook: string;
  url: null | string;
};
