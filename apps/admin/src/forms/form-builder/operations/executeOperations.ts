import {type FormOperation, type FormOperationMethods} from '../types/common.types';
import {type HandlerDefinition} from '../types/FormOperations.types';
import {executeOperation} from './executeOperation';

export const executeOperations = (
  operations: FormOperation[],
  methods: FormOperationMethods,
  customHandlers: HandlerDefinition[] = [],
): void => {
  operations.forEach((operation) => executeOperation(operation, methods, customHandlers));
};
