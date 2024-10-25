import {type FormOperationMethods} from '../types/common.types';
import {type FormSetValueOperation} from '../types/FormOperations.types';
import {validateIfConditions} from '../conditions/validateIfConditions';

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
