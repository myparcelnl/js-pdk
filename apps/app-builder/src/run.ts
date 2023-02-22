import {copy, rename, zip} from './commands';
import {createWithConfig, createWithContext} from './utils/hooks';
import {LiftoffEnv} from 'liftoff';
import {init} from './commands/init';
import packageJson from '../package.json' assert {type: 'json'};
import {program} from 'commander';

const OPTION_VERBOSE = ['-v', 'Enable verbose mode'] as const;
const OPTION_VERY_VERBOSE = ['-vv', 'Enable very verbose mode'] as const;
const OPTION_VERY_VERY_VERBOSE = ['-vvv', 'Enable very very verbose mode'] as const;

const OPTION_DRY_RUN = ['--dry-run', 'Dry run'] as const;

const ARGUMENT_PROJECT = ['[project]', 'Project name', 'all'] as const;

export const run = (env: LiftoffEnv, argv: string[]): void => {
  const withContext = createWithContext(env, argv);
  const withConfig = createWithConfig(env, argv);

  program.name('PDK Builder').description('Builds a plugin.').version(packageJson.version);

  program
    .command('init')
    .description('Create a new config file')
    .option(...OPTION_VERBOSE)
    .option(...OPTION_VERY_VERBOSE)
    .option(...OPTION_VERY_VERY_VERBOSE)
    .action(withContext(init));

  program
    .command('all')
    .description('Run all commands in sequence')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSE)
    .option(...OPTION_VERY_VERBOSE)
    .option(...OPTION_VERY_VERY_VERBOSE)
    .action(
      withConfig(async (context) => {
        await Promise.all([copy(context), rename(context), zip(context)]);
      }),
    );

  program
    .command('copy')
    .description('Copy files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSE)
    .option(...OPTION_VERY_VERBOSE)
    .option(...OPTION_VERY_VERY_VERBOSE)
    .action(withConfig(copy));

  program
    .command('rename')
    .description('Rename files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSE)
    .option(...OPTION_VERY_VERBOSE)
    .option(...OPTION_VERY_VERY_VERBOSE)
    .action(withConfig(rename));

  program
    .command('zip')
    .description('Zip dist files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSE)
    .option(...OPTION_VERY_VERBOSE)
    .option(...OPTION_VERY_VERY_VERBOSE)
    .action(withConfig(zip));

  program.parse(argv);
};
