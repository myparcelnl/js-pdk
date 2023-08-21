import {type FormOperation, type WithTarget} from './common.types';
import {type WithCondition} from './FormCondition.types';

export type WhenArguments = Partial<WithCondition> & Partial<WithTarget>;

type FormWhenBuilder<T extends string = string> = {
  [K in T]: WhenArguments;
};

export type FormVisibleWhenBuilder = FormWhenBuilder<'$visibleWhen'>;

export type FormDisabledWhenBuilder = FormWhenBuilder<'$disabledWhen'>;

export type FormReadOnlyWhenBuilder = FormWhenBuilder<'$readOnlyWhen'>;

export interface FormAfterUpdateBuilder {
  $afterUpdate: FormOperation[];
}
