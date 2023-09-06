import {type FormOperation, type FormOperationMethods, type HandlerDefinition} from '../types';
import {validateIfConditions} from '../conditions';

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
