import {
  type FormAfterUpdateBuilder,
  type FormDisabledWhenBuilder,
  type FormReadOnlyWhenBuilder,
  type FormVisibleWhenBuilder,
} from './SubOperationBuilder.types';
import {type WithCondition} from './FormCondition.types';

export type AnyVal = string | number | boolean;

export interface WithTarget {
  $target: string;
}

export interface WithValue {
  $value: AnyVal;
}

export type FormWhenBuilder = FormVisibleWhenBuilder | FormDisabledWhenBuilder | FormReadOnlyWhenBuilder;

export type OperationArguments = Partial<WithTarget | WithValue | WithCondition>;

export type FormOperation = Record<string, OperationArguments>;

export type FormBuilder = FormWhenBuilder | FormAfterUpdateBuilder;
