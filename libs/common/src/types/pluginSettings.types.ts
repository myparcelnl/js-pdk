import {Component} from 'vue';

export type LabelFormat = 'A4' | 'A6';

export type LabelOutput = 'open' | 'download';

export type LabelPosition = '1' | '2' | '3' | '4';

export interface SelectOption<Value = string | number> {
  disabled?: boolean;
  label: string;
  value: Value;
}

export interface PdkTab {
  name: string;
  label: string;
  description?: string;
  icon?: string;
  component: string | Component;
}
