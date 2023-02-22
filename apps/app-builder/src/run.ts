import {copy, rename, zip} from './commands';
import {LiftoffEnv} from 'liftoff';
import {init} from './commands/init';
import packageJson from '../package.json' assert {type: 'json'};
import {program} from 'commander';
import {withConfig} from './utils/withConfig';

const OPTION_DEBUG = ['--debug', 'Enable debug mode'] as const;
const OPTION_DRY_RUN = ['--dry-run', 'Dry run'] as const;

const ARGUMENT_PROJECT = ['[project]', 'Project name', 'all'] as const;

export const run = async (env: LiftoffEnv, argv: string[]): Promise<void> => {
  program.name('PDK Builder').description('Builds a plugin.').version(packageJson.version);

  program.command('init').description('Create a new config file').action(init);

  program
    .command('all')
    .description('Run all commands in sequence')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_DEBUG)
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
    .option(...OPTION_DEBUG)
    .action(withConfig(copy));

  program
    .command('rename')
    .description('Rename files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_DEBUG)
    .action(withConfig(rename));

  program
    .command('zip')
    .description('Zip dist files')
    .argument(...ARGUMENT_PROJECT)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_DEBUG)
    .action(withConfig(zip));

  program.parse(argv);
};
