import {type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {createPropSetter, createValueGetter, createValueSetter} from '../utils';
import {type FormOperation, type HandlerDefinition} from '../types';
import {executeOperations} from '../operations';

export const buildAfterUpdate = (
  operations: FormOperation[],
  prefix: string,
  customHandlers: HandlerDefinition[] = [],
): ((instance: InteractiveElementInstance) => void) => {
  return (instance: InteractiveElementInstance): void => {
    const getValue = createValueGetter(instance, prefix);
    const setValue = createValueSetter(instance, prefix);
    const setProp = createPropSetter(instance, prefix);

    executeOperations(
      operations,
      {
        getValue,
        setValue,
        setProp,
      },
      customHandlers,
    );
  };
};
