import {type LiftoffEnv} from 'liftoff';
import {program} from 'commander';
import {registerConfigCommand} from './utils/registerConfigCommand';
import {createWithConfig, createWithContext, resolveConfig} from './utils';
import {type CommandDefinition} from './types';
import {
  COMMAND_BUILD_NAME,
  COMMAND_CLEAN_NAME,
  COMMAND_COPY_NAME,
  COMMAND_INCREMENT_NAME,
  COMMAND_INIT_NAME,
  COMMAND_RELEASE_NAME,
  COMMAND_RENAME_NAME,
  COMMAND_TRANSFORM_NAME,
  COMMAND_TRANSLATIONS_NAME,
  COMMAND_UPGRADE_NAME,
  COMMAND_ZIP_NAME,
  TITLE,
} from './constants';

const OPTION_VERSION = ['--version <version>', 'Version to use. Defaults to version in config.'] as const;

const OPTION_VERBOSITY = ['-v, --verbose', 'Verbosity', (_: string, prev: number) => prev + 1, 0] as const;

const OPTION_QUIET = ['-q, --quiet', 'Quiet'] as const;

const OPTION_DRY_RUN = ['-d, --dry-run', 'Dry run'] as const;

const OPTION_PARALLEL = ['-p, --parallel', 'Run each platform in parallel'] as const;

const REQUIRES_CONFIG_FILE = 'Requires a config file.';

const COMMAND_CLEAN: CommandDefinition = {
  name: COMMAND_CLEAN_NAME,
  action: () => import('./commands/clean'),
  description: `Clear output directory. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN],
};

const COMMAND_COPY: CommandDefinition = {
  name: COMMAND_COPY_NAME,
  action: () => import('./commands/copy'),
  description: `Copy source files to output directory. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN],
};

const COMMAND_INCREMENT: CommandDefinition = {
  name: COMMAND_INCREMENT_NAME,
  action: () => import('./commands/increment'),
  description: `Increment version in output files. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN, OPTION_VERSION],
};

const COMMAND_RENAME: CommandDefinition = {
  name: COMMAND_RENAME_NAME,
  action: () => import('./commands/rename'),
  description: `Transform output files. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN],
};

const COMMAND_TRANSFORM: CommandDefinition = {
  name: COMMAND_TRANSFORM_NAME,
  action: () => import('./commands/transform'),
  description: `Transform output files. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN],
};

const COMMAND_TRANSLATIONS: CommandDefinition = {
  name: COMMAND_TRANSLATIONS_NAME,
  action: () => import('./commands/translations'),
  description: `Import translations. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN],
};

const COMMAND_UPGRADE: CommandDefinition = {
  name: COMMAND_UPGRADE_NAME,
  action: () => import('./commands/upgrade'),
  description: `Upgrade a dependency. ${REQUIRES_CONFIG_FILE}`,
  options: [
    OPTION_VERBOSITY,
    OPTION_QUIET,
    OPTION_DRY_RUN,
    ['-l, --lockfile <lockfile>', 'Provide an alternative path to a lockfile.'],
    ['--commit-type <type>', 'Commit type', 'chore'],
    ['--no-check', 'Skip checking whether the lockfile is modified.'],
    ['--no-commit', 'Skip creating a commit.'],
  ],
  args: [['[package]', 'Package to upgrade']],
};

const COMMAND_ZIP: CommandDefinition = {
  name: COMMAND_ZIP_NAME,
  action: () => import('./commands/zip'),
  description: `Compress output files into an archive. ${REQUIRES_CONFIG_FILE}`,
  options: [OPTION_VERBOSITY, OPTION_QUIET, OPTION_DRY_RUN],
};

const CONFIG_COMMANDS = [
  COMMAND_CLEAN,
  COMMAND_COPY,
  COMMAND_INCREMENT,
  COMMAND_RENAME,
  COMMAND_TRANSFORM,
  COMMAND_TRANSLATIONS,
  COMMAND_UPGRADE,
  COMMAND_ZIP,
] as const;

const BUILD_COMMANDS = [COMMAND_CLEAN, COMMAND_TRANSLATIONS, COMMAND_COPY, COMMAND_RENAME, COMMAND_TRANSFORM] as const;

const RELEASE_COMMANDS = [
  COMMAND_CLEAN,
  COMMAND_INCREMENT,
  COMMAND_TRANSLATIONS,
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
    .option(...OPTION_QUIET)
    .action(withContext(() => import('./commands/init')));

  CONFIG_COMMANDS.forEach((definition) => registerConfigCommand(definition, withConfig));

  ALL_BULK_COMMANDS.forEach(([commandName, commands]) => {
    program
      .command(commandName)
      .description(`Run ${commands.map(({name}) => name).join(', ')} in sequence. ${REQUIRES_CONFIG_FILE}`)
      .option(...OPTION_DRY_RUN)
      .option(...OPTION_PARALLEL)
      .option(...OPTION_VERBOSITY)
      .option(...OPTION_QUIET)
      .option(...OPTION_VERSION)
      .action(async (...args) => {
        for (const command of commands) {
          await withConfig(command.action)(...args);
        }
      });
  });

  void (async () => {
    if (env.configPath) {
      const config = await resolveConfig(env);

      config.additionalCommands?.forEach((definition) => {
        const resolvedDefinition = {
          ...definition,
          action: () => Promise.resolve({default: definition.action}),
        };

        return registerConfigCommand(resolvedDefinition, withConfig);
      });
    }

    program.parse(argv);
  })();
};
