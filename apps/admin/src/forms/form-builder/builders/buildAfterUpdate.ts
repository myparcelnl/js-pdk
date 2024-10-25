import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {createValueSetter} from '../utils/createValueSetter';
import {createValueGetter} from '../utils/createValueGetter';
import {createPropSetter} from '../utils/createPropSetter';
import {type FormOperation} from '../types/common.types';
import {type HandlerDefinition} from '../types/FormOperations.types';
import {executeOperations} from '../operations/executeOperations';

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
