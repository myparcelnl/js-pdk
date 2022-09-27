import {Variant} from './boop.types';

export interface DropdownButtonItem {
  action: string | number;
  icon?: string;
  label: string;
  variant?: Variant;
}

export interface SelectOption<Value = string | number> {
  label: string;
  value: Value;
}
