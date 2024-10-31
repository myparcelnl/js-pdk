import {toArray} from '@myparcel/ts-utils';
import {
  type BulkCommandDefinition,
  type CommandWithArguments,
  type CommandWithOrWithoutArguments,
  type InputBulkCommandDefinition,
} from '../types/bulkCommand.types';

export const defineBulkCommand = <Command extends CommandWithOrWithoutArguments>(
  definition: InputBulkCommandDefinition<Command>,
): BulkCommandDefinition => ({
  ...definition,
  commands: definition.commands.map((item) => toArray(item) as CommandWithArguments),
});
