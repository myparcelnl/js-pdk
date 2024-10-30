import {type RecursivePartial} from '@myparcel/ts-utils';
import {mergeDefaultConfig} from '../utils/mergeDefaultConfig';
import {createDebugger} from '../utils/command/createDebugger';
import {type PdkBuilderConfig} from '../types/config';
import {type CommandArgs, type PdkBuilderContext} from '../types/command';
import {PdkPlatformName} from '../constants';
import {MOCK_ROOT_DIR} from './constants';

export const createTestContext = <Context extends PdkBuilderContext = PdkBuilderContext>(
  context?: RecursivePartial<Context>,
): Context => {
  const args: CommandArgs = {
    arguments: [],
    dryRun: false,
    parallel: false,
    quiet: true,
    verbose: 0,
    version: '1.0.0',
    ...context?.args,
  };

  const config = mergeDefaultConfig({
    name: 'test',
    platforms: [PdkPlatformName.MyParcelNl, PdkPlatformName.MyParcelBe, PdkPlatformName.Flespakket],
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
