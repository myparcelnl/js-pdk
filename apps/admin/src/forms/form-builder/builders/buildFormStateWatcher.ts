import {type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {createValueGetter} from '../utils';
import {type WhenArguments} from '../types';
import {validateIfConditions} from '../conditions';

export const buildFormStateWatcher = (
  input: WhenArguments,
  prefix: string,
): ((instance: InteractiveElementInstance) => boolean) => {
  return (instance: InteractiveElementInstance): boolean => {
    const getValue = createValueGetter(instance, prefix);

    return validateIfConditions(input, getValue);
  };
};
