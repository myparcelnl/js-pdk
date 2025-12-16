import {type RecursivePartial} from '@myparcel-dev/ts-utils';
import {type PdkBuilderContext} from '../types/command.types';
import {createTestContext} from './createTestContext';

export const createTestContextWithMockedFs = <Context extends PdkBuilderContext = PdkBuilderContext>(
  rootDir: string,
  context?: RecursivePartial<Context>,
): Context => {
  return createTestContext<Context>({
    env: {
      cwd: rootDir,
      ...context?.env,
    },
    ...context,
  } as RecursivePartial<Context>);
};
