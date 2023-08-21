import {type FormValueGetter, type FormValueSetter} from '../utils';
import {type FormSetValueOperation} from '../types';
import {validateIfConditions} from '../conditions';

export const executeSetValueOperation = (
  operation: FormSetValueOperation,
  getValue: FormValueGetter,
  setValue: FormValueSetter,
): void => {
  if (!validateIfConditions(operation.$setValue, getValue)) {
    return;
  }

  const {$value, $target} = operation.$setValue;

  setValue($target, $value);
};
