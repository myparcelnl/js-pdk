import {type FormOperationMethods, type FormSetPropOperation} from '../types';
import {validateIfConditions} from '../conditions';

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
