import {type LiftoffEnv} from 'liftoff';
import {program} from 'commander';
import {isOfType, partitionArray, toArray} from '@myparcel/ts-utils';
import {resolveConfig} from './utils/resolveConfig';
import {getBulkCommandDescription} from './utils/getBulkCommandDescription';
import {registerCommand} from './utils/command/registerCommand';
import {createWithContext} from './utils/command/createWithContext';
import {createWithConfig} from './utils/command/createWithConfig';
import {
  type AnyCommandDefinition,
  type CommandDefinitionWithoutConfig,
  type DefaultCommandArgs,
} from './types/command.types';
import {ALL_BULK_COMMANDS, ALL_COMMANDS} from './definitions';
import {BULK_COMMAND_OPTIONS, CONFIG_OPTIONS, TITLE} from './constants';

// eslint-disable-next-line max-lines-per-function
export const run = (env: LiftoffEnv, argv: string[]): void => {
  const withContext = createWithContext(env);
  const withConfig = createWithConfig(env);

  program.name(TITLE).description('Builds a plugin for MyParcel.');

  const [commandsWithoutConfig, commandsWithConfig] = partitionArray([...ALL_COMMANDS], (command) =>
    isOfType<CommandDefinitionWithoutConfig>(command, 'hasConfig'),
  );

  commandsWithoutConfig.forEach((definition) => registerCommand(definition, withContext));

  commandsWithConfig.forEach((definition) => {
    registerCommand({...definition, description: `${definition.description} Requires a config file.`}, withConfig);
  });

  ALL_BULK_COMMANDS.forEach(({name, description, commands}) => {
    const commandDefinitions = commands.map((definition) => {
      return toArray(definition)[0] as AnyCommandDefinition;
    });

    const command = program.command(name).description(getBulkCommandDescription(commandDefinitions, description));

    const allOptions = [
      ...commandDefinitions.flatMap((definition) => definition.options ?? []),
      ...BULK_COMMAND_OPTIONS,
    ];

    allOptions
      .filter(([name], index) => {
        // remove duplicates
        return allOptions.findIndex((option) => option[0] === name) === index;
      })
      // @ts-expect-error todo
      .forEach((option) => command.option(...option));

    command.action(async (args, originalCommand) => {
      for (const command of commands) {
        const [resolvedCommand, commandOptions] = command;

        const resolvedArgs: DefaultCommandArgs = {...args, ...commandOptions};

        await withConfig(resolvedCommand)(resolvedArgs, originalCommand);
      }
    });
  });

  void (async () => {
    if (env.configPath) {
      const config = await resolveConfig(env);

      config.additionalCommands?.forEach((definition) => {
        return registerCommand(
          {
            ...definition,
            options: [...CONFIG_OPTIONS, ...(definition.options ?? [])],
            action: () => Promise.resolve({default: definition.action}),
          },
          withConfig,
        );
      });
    }

    program.parse(argv);
  })();
};
