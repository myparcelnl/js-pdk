import {type RecursivePartial} from '@myparcel-dev/ts-utils';
import {mergeDefaultConfig} from '../utils/mergeDefaultConfig';
import {createDebugger} from '../utils/command/createDebugger';
import {type PdkBuilderConfig} from '../types/config.types';
import {type DefaultCommandArgs, type PdkBuilderContext} from '../types/command.types';
import {MOCK_ROOT_DIR} from './constants';

export const createTestContext = <Context extends PdkBuilderContext = PdkBuilderContext>(
  context?: RecursivePartial<Context>,
): Context => {
  const args: DefaultCommandArgs = {
    arguments: [],
    dryRun: false,
    parallel: false,
    quiet: true,
    verbose: 0,
    ...context?.args,
  };

  const config = mergeDefaultConfig({
    name: 'test',
    source: [],
    versionSource: [],
    ...context?.config,
  } as PdkBuilderConfig);

  return {
    ...context,
    args,
    config,
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
  } as Context;
};
