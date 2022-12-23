export type LabelFormat = 'a4' | 'a6';

export type LabelOutput = 'open' | 'download';

export type LabelPosition = '1' | '2' | '3' | '4';

export interface SelectOption<Value = string | number> {
  disabled?: boolean;
  label: string;
  value: Value;
}
