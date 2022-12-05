export interface SelectOption<Value = string | number> {
  disabled?: boolean;
  label: string;
  value: Value;
}
