import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {createValueGetter} from '../utils/createValueGetter';
import {type WhenArguments} from '../types/SubOperationBuilder.types';
import {validateIfConditions} from '../conditions/validateIfConditions';

export const buildFormStateWatcher = (
  input: WhenArguments,
  prefix: string,
): ((instance: InteractiveElementInstance) => boolean) => {
  return (instance: InteractiveElementInstance): boolean => {
    const getValue = createValueGetter(instance, prefix);

    return validateIfConditions(input, getValue);
  };
};
