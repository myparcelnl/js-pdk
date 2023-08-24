import {type FormOperation, type FormOperationMethods, type HandlerDefinition} from '../types';
import {executeOperation} from './executeOperation';

export const executeOperations = (
  operations: FormOperation[],
  methods: FormOperationMethods,
  customHandlers: HandlerDefinition[] = [],
): void => {
  operations.forEach((operation) => executeOperation(operation, methods, customHandlers));
};
