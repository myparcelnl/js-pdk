import {isOfType} from '@myparcel/ts-utils';
import {type FormValueGetter, type FormValueSetter} from '../utils';
import {type FormOperation, type FormSetValueOperation} from '../types';
import {executeSetValueOperation} from './executeSetValueOperation';

export const executeOperation = (
  operation: FormOperation,
  getValue: FormValueGetter,
  setValue: FormValueSetter,
): void => {
  if (isOfType<FormSetValueOperation>(operation, '$setValue')) {
    executeSetValueOperation(operation, getValue, setValue);
  }
};
