import {type FormOperationMethods} from '../types/common.types';
import {type FormSetPropOperation} from '../types/FormOperations.types';
import {validateIfConditions} from '../conditions/validateIfConditions';

export const executeSetPropOperation = (
  operation: FormSetPropOperation,
  {getValue, setProp}: FormOperationMethods,
): void => {
  if (!validateIfConditions(operation.$setProp, getValue)) {
    return;
  }

  const {$prop, $value, $target} = operation.$setProp;

  setProp($prop, $value, $target);
};
