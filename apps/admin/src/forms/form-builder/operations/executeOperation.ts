import {isOfType} from '@myparcel/ts-utils';
import {type FormOperation, type FormOperationMethods} from '../types/common.types';
import {
  type FormSetPropOperation,
  type FormSetValueOperation,
  type HandlerDefinition,
} from '../types/FormOperations.types';
import {executeSetValueOperation} from './executeSetValueOperation';
import {executeSetPropOperation} from './executeSetPropOperation';
import {executeCustomOperationHandlers} from './executeCustomOperationHandlers';

export const executeOperation = (
  operation: FormOperation,
  methods: FormOperationMethods,
  customHandlers: HandlerDefinition[] = [],
): void => {
  if (isOfType<FormSetValueOperation>(operation, '$setValue')) {
    executeSetValueOperation(operation, methods);
  }

  if (isOfType<FormSetPropOperation>(operation, '$setProp')) {
    executeSetPropOperation(operation, methods);
  }

  executeCustomOperationHandlers(operation, methods, customHandlers);
};
