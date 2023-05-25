import {LiftoffEnv} from 'liftoff';
import {program} from 'commander';
import {createWithConfig, createWithContext} from './utils';
import {PdkBuilderCommand} from './types';
import {
  COMMAND_BUILD_NAME,
  COMMAND_CLEAN_NAME,
  COMMAND_COPY_NAME,
  COMMAND_INCREMENT_NAME,
  COMMAND_INIT_NAME,
  COMMAND_RELEASE_NAME,
  COMMAND_RENAME_NAME,
  COMMAND_TRANSFORM_NAME,
  COMMAND_ZIP_NAME,
  TITLE,
} from './constants';
import {clean, copy, increment, init, rename, transform, zip} from './commands';

type CommandDefinition = {
  name: string;
  action: PdkBuilderCommand;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any[];
};

const OPTION_VERSION = ['--version <version>', 'Version to use. Defaults to version in config.'] as const;

const OPTION_VERBOSITY = ['-v, --verbose', 'Verbosity', (dummy: string, prev: number) => prev + 1, 0] as const;

const OPTION_DRY_RUN = ['--dry-run', 'Dry run'] as const;

const OPTION_PARALLEL = ['--parallel', 'Run each platform in parallel'] as const;

const REQUIRES_CONFIG_FILE = 'Requires a config file.';

const COMMAND_CLEAN: CommandDefinition = {
  name: COMMAND_CLEAN_NAME,
  action: clean,
  description: `Clear output directory. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_DRY_RUN],
};

const COMMAND_COPY: CommandDefinition = {
  name: COMMAND_COPY_NAME,
  action: copy,
  description: `Copy source files to output directory. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_DRY_RUN],
};

const COMMAND_INCREMENT: CommandDefinition = {
  name: COMMAND_INCREMENT_NAME,
  action: increment,
  description: `Increment version in output files. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_DRY_RUN, OPTION_VERSION],
};

const COMMAND_RENAME: CommandDefinition = {
  name: COMMAND_RENAME_NAME,
  action: rename,
  description: `Transform output files. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_DRY_RUN],
};

const COMMAND_TRANSFORM: CommandDefinition = {
  name: COMMAND_TRANSFORM_NAME,
  action: transform,
  description: `Transform output files. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_DRY_RUN],
};

const COMMAND_ZIP: CommandDefinition = {
  name: COMMAND_ZIP_NAME,
  action: zip,
  description: `Compress output files into an archive. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_DRY_RUN],
};

const CONFIG_COMMANDS = [
  COMMAND_CLEAN,
  COMMAND_COPY,
  COMMAND_INCREMENT,
  COMMAND_RENAME,
  COMMAND_TRANSFORM,
  COMMAND_ZIP,
] as const;

const BUILD_COMMANDS = [COMMAND_CLEAN, COMMAND_COPY, COMMAND_RENAME, COMMAND_TRANSFORM] as const;

const RELEASE_COMMANDS = [
  COMMAND_CLEAN,
  COMMAND_INCREMENT,
  COMMAND_COPY,
  COMMAND_RENAME,
  COMMAND_TRANSFORM,
  COMMAND_ZIP,
] as const;

const ALL_BULK_COMMANDS = [
  [COMMAND_RELEASE_NAME, RELEASE_COMMANDS],
  [COMMAND_BUILD_NAME, BUILD_COMMANDS],
] as const;

// eslint-disable-next-line max-lines-per-function
export const run = (env: LiftoffEnv, argv: string[]): void => {
  const withContext = createWithContext(env, argv);
  const withConfig = createWithConfig(env, argv);

  program.name(TITLE).description('Builds a plugin for MyParcel.');

  program
    .command(COMMAND_INIT_NAME)
    .description(`Generate a config file in the current directory. Necessary for all other commands.`)
    .option(...OPTION_VERBOSITY)
    .action(withContext(init));

  CONFIG_COMMANDS.forEach(({name, description, options, action}) => {
    const command = program.command(name).description(description);

    if (options) {
      options.forEach((option) => {
        // @ts-expect-error todo
        command.option(...option);
      });
    }

    command.action(withConfig(action));
  });

  ALL_BULK_COMMANDS.forEach(([commandName, commands]) => {
    program
      .command(commandName)
      .description(`Run ${commands.map(({name}) => name).join(', ')} in sequence. ${REQUIRES_CONFIG_FILE}`)
      .option(...OPTION_DRY_RUN)
      .option(...OPTION_PARALLEL)
      .option(...OPTION_VERBOSITY)
      .option(...OPTION_VERSION)
      .action(
        withConfig(async (context) => {
          for (const command of commands) {
            await command.action(context);
          }
        }),
      );
  });

  program.parse(argv);
};
