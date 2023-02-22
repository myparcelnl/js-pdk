import {compress, copy, rename} from './commands';
import {createWithConfig, createWithContext} from './utils/hooks';
import {LiftoffEnv} from 'liftoff';
import {clean} from './commands/clean';
import {init} from './commands/init';
import {program} from 'commander';

const OPTION_VERBOSITY = ['-v, --verbose', 'Verbosity', (dummy: string, prev: number) => prev + 1, 0] as const;

const OPTION_DRY_RUN = ['--dry-run', 'Dry run'] as const;

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
    .description(`Clear output directory. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(clean));

  program
    .command('copy')
    .description(`Copy source files to output directory. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(copy));

  program
    .command('rename')
    .description(`Rename output files. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(rename));

  program
    .command('compress')
    .description(`Compress output files into an archive. ${REQUIRES_CONFIG_FILE}`)
    .option(...OPTION_DRY_RUN)
    .option(...OPTION_VERBOSITY)
    .action(withConfig(compress));

  program.parse(argv);
};
