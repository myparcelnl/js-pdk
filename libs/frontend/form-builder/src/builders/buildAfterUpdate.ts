import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {createValueGetter, createValueSetter} from '../utils';
import {type FormOperation} from '../types';
import {executeOperations} from '../operations';

export const buildAfterUpdate = (
  operations: FormOperation[],
  prefix: string,
): ((instance: InteractiveElementInstance) => void) => {
  return (instance: InteractiveElementInstance): void => {
    const getValue = createValueGetter(instance, prefix);
    const setValue = createValueSetter(instance, prefix);

    executeOperations(operations, getValue, setValue);
  };
};
