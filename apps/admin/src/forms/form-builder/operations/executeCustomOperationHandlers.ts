import {type FormOperation, type FormOperationMethods} from '../types/common.types';
import {type HandlerDefinition} from '../types/FormOperations.types';
import {validateIfConditions} from '../conditions/validateIfConditions';

export const executeCustomOperationHandlers = (
  operation: FormOperation,
  methods: FormOperationMethods,
  customHandlers: HandlerDefinition[] = [],
): void => {
  customHandlers.forEach((handler) => {
    const matchingOperation = operation[handler.name] as FormOperation | undefined;

    if (!matchingOperation || !validateIfConditions(matchingOperation, methods.getValue)) {
      return;
    }

    handler.callback(matchingOperation, methods);
  });
};
