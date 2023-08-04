import {Command} from 'commander';
import {createDebugger, mergeDefaultConfig} from '../utils';
import {type PdkBuilderContext, PdkPlatformName} from '../types';

export const createTestContext = (context?: Partial<PdkBuilderContext>): PdkBuilderContext => {
  const verbose = 0;

  return {
    args: {
      arguments: [],
      command: new Command(),
      dryRun: false,
      parallel: false,
      quiet: true,
      verbose,
      version: '1.0.0',
      ...context?.args,
    },
    config: mergeDefaultConfig({
      name: 'test',
      platforms: [PdkPlatformName.MyParcelNl, PdkPlatformName.MyParcelBe, PdkPlatformName.Flespakket],
      source: [],
      versionSource: [],
      ...context?.config,
    }),
    debug: createDebugger('test', {verbose}),
    env: {
      cwd: 'CWD',
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
    ...context,
  };
};
