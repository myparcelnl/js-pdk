import {type OneOrMore} from '@myparcel/ts-utils';
import {type FormValueSetter} from '../utils/createValueSetter';
import {type FormValueGetter} from '../utils/createValueGetter';
import {type FormPropSetter} from '../utils/createPropSetter';
import {
  type FormAfterUpdateBuilder,
  type FormDisabledWhenBuilder,
  type FormReadOnlyWhenBuilder,
  type FormVisibleWhenBuilder,
} from './SubOperationBuilder.types';
import {type WithCondition} from './FormCondition.types';

export type AnyVal = string | number | boolean;

export type PropVal = OneOrMore<AnyVal> | OneOrMore<Record<string, AnyVal>>;

export interface WithTarget {
  $target: string;
}

export interface WithValue<V = AnyVal> {
  $value: V;
}

export type FormWhenBuilder = FormVisibleWhenBuilder | FormDisabledWhenBuilder | FormReadOnlyWhenBuilder;

export type OperationArguments = Partial<WithTarget | WithValue | WithCondition>;

export type FormOperation = Record<string, OperationArguments>;

export type FormBuilder = FormWhenBuilder | FormAfterUpdateBuilder;

export type FormOperationMethods = {
  getValue: FormValueGetter;
  setValue: FormValueSetter;
  setProp: FormPropSetter;
};
