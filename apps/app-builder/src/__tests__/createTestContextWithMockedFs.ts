import {type RecursivePartial} from '@myparcel/ts-utils';
import {type PdkBuilderContext} from '../types/command';
import {createTestContext} from './createTestContext';

export const createTestContextWithMockedFs = (
  rootDir: string,
  context?: RecursivePartial<PdkBuilderContext>,
): PdkBuilderContext => {
  return createTestContext({env: {cwd: rootDir, ...context?.env}, ...context});
};
