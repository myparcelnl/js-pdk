import {type FormOperationMethods, type PropVal, type WithTarget, type WithValue} from './common.types';
import {type WithCondition} from './FormCondition.types';

export type FormSetValueOperation = {
  $setValue: WithValue & Partial<WithCondition> & Partial<WithTarget>;
};

export type FormSetPropOperation = {
  $setProp: {
    $prop: string;
  } & WithValue<PropVal> &
    Partial<WithCondition> &
    Partial<WithTarget>;
};

type HandlerCallback<T extends string> = (operation: Record<T, unknown>, methods: FormOperationMethods) => void;

export type HandlerDefinition<T extends string = string> = {
  name: T;
  callback: HandlerCallback<T>;
};
