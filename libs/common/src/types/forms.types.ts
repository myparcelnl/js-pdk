import {Variant} from './misc.types';

export interface DropdownButtonItem {
  action: string | number;
  icon?: string;
  label: string;
  variant?: Variant;
}

export interface SelectOption<Value = string | number> {
  disabled?: boolean;
  label: string;
  value: Value;
}
