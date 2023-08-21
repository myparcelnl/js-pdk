import {type FormValueGetter, type FormValueSetter} from '../utils';
import {type FormOperation} from '../types';
import {executeOperation} from './executeOperation';

export const executeOperations = (
  operations: FormOperation[],
  getValue: FormValueGetter,
  setValue: FormValueSetter,
): void => {
  operations.forEach((operation) => executeOperation(operation, getValue, setValue));
};
