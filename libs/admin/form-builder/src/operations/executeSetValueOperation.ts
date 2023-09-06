import {type FormOperationMethods, type FormSetValueOperation} from '../types';
import {validateIfConditions} from '../conditions';

export const executeSetValueOperation = (
  operation: FormSetValueOperation,
  {getValue, setValue}: FormOperationMethods,
): void => {
  if (!validateIfConditions(operation.$setValue, getValue)) {
    return;
  }

  const {$value, $target} = operation.$setValue;

  setValue($value, $target);
};
