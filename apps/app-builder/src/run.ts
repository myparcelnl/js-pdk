import {compress, copy, rename} from './commands';
import {createWithConfig, createWithContext} from './utils/hooks';
import {LiftoffEnv} from 'liftoff';
import {clean} from './commands/clean';
import {init} from './commands/init';
import {program} from 'commander';

const OPTION_VERBOSITY = ['-v, --verbose', 'Verbosity', (dummy: string, prev: number) => prev + 1, 0] as const;

const OPTION_DRY_RUN = ['--dry-run', 'Dry run'] as const;

const ARGUMENT_PROJECT = ['[project]', 'Project name', 'all'] as const;

// eslint-disable-next-line max-lines-per-function
export const run = (env: LiftoffEnv, argv: string[]): void => {
  const withContext = createWithContext(env, argv);
  const withConfig = createWithConfig(env, argv);

  program.name('PDK Builder').description('Builds a plugin.');

  program
    .command('init')
    .description('Create a new config file')
    .option(...OPTION_VERBOSITY)
    .action(withContext(init));

  program
    .command('all')
    .description('Run all commands in sequence')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(
      withConfig(async (context) => {
        await clean(context);
        await copy(context);
        await rename(context);
        await compress(context);
      }),
    );

  program
    .command('clean')
    .description('Clean dist files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(clean));

  program
    .command('copy')
    .description('Copy files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(copy));

  program
    .command('rename')
    .description('Rename files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(rename));

  program
    .command('zip')
    .description('Zip dist files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(compress));

  program.parse(argv);
};
