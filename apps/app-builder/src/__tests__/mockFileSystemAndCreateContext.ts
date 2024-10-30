import {type TaskContext} from 'vitest';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {type PdkBuilderContext} from '../types/command';
import {mockFileSystem} from './mockFileSystem';
import {createTestContextWithMockedFs} from './createTestContextWithMockedFs';

export const mockFileSystemAndCreateContext = async <Context extends PdkBuilderContext = PdkBuilderContext>(
  ctx: TaskContext,
  fileSystem?: Record<string, unknown>,
  config?: RecursivePartial<Context>,
): Promise<Context> => {
  const rootDir = await mockFileSystem(ctx, fileSystem);

  return createTestContextWithMockedFs<Context>(rootDir, config);
};
