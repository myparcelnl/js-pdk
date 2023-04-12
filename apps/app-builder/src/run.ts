import {clean, copy, init, rename, transform, zip} from './commands';
import {createWithConfig, createWithContext} from './utils';
import {LiftoffEnv} from 'liftoff';
import {program} from 'commander';

const OPTION_VERBOSITY = ['-v, --verbose', 'Verbosity', (dummy: string, prev: number) => prev + 1, 0] as const;

const OPTION_DRY_RUN = ['--dry-run', 'Dry run'] as const;

const OPTION_PARALLEL = ['--parallel', 'Run each platform in parallel'] as const;

const REQUIRES_CONFIG_FILE = 'Requires a config file.';

// eslint-disable-next-line max-lines-per-function
export const run = (env: LiftoffEnv, argv: string[]): void => {
  const withContext = createWithContext(env, argv);
  const withConfig = createWithConfig(env, argv);

  program.name('pdk-builder').description('Builds a plugin for MyParcel.');

  program
    .command('init')
    .description(`Generate a config file in the current directory. Necessary for all other commands.`)
    .option(...OPTION_VERBOSITY)
    .action(withContext(init));

  program
    .command('build')
    .description(`Run clean, copy, rename and compress in sequence. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_PARALLEL)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(
      withConfig(async (context) => {
        for (const command of [clean, copy, rename, transform, zip]) {
          await command(context);
        }
      }),
    );

  program
    .command(clean.name)
    .description(`Clear output directory. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(clean));

  program
    .command(copy.name)
    .description(`Copy source files to output directory. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_PARALLEL)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(copy));

  program
    .command(rename.name)
    .description(`Rename output files. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_PARALLEL)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(rename));
  program
    .command(transform.name)
    .description(`Replace content in output files. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_PARALLEL)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(transform));

  program
    .command(zip.name)
    .description(`Compress output files into an archive. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_PARALLEL)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(zip));

  program.parse(argv);
};
