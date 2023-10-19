import {Command} from 'commander';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {createDebugger, mergeDefaultConfig} from '../utils';
import {type CommandArgs, type PdkBuilderContext, PdkPlatformName} from '../types';
import {MOCK_ROOT_DIR} from './constants';

type Input = RecursivePartial<PdkBuilderContext>;

export const createTestContext = (context?: Input): PdkBuilderContext => {
  const args = {
    arguments: [],
    command: new Command(),
    dryRun: false,
    parallel: false,
    quiet: true,
    verbose: 0,
    version: '1.0.0',
    ...context?.args,
  } as CommandArgs;

  return {
    ...context,
    args,
    config: mergeDefaultConfig({
      name: 'test',
      platforms: [PdkPlatformName.MyParcelNl, PdkPlatformName.MyParcelBe, PdkPlatformName.Flespakket],
      source: [],
      // @ts-expect-error todo
      versionSource: [],
      ...context?.config,
    }),
    debug: createDebugger('test', args),
    env: {
      cwd: MOCK_ROOT_DIR,
      config: {},
      configFiles: {},
      modulePackage: {},
      preload: [],
      configNameSearch: [],
      configBase: '',
      configPath: '',
      modulePath: '',
      completion: false,
      ...context?.env,
    },
  } as PdkBuilderContext;
};
