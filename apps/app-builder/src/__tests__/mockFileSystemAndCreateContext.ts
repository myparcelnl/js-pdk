import {type TaskContext} from 'vitest';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {type PdkBuilderContext} from '../types/command';
import {mockFileSystem} from './mockFileSystem';
import {createTestContextWithMockedFs} from './createTestContextWithMockedFs';

export const mockFileSystemAndCreateContext = async (
  ctx: TaskContext,
  fileSystem?: Record<string, unknown>,
  config?: RecursivePartial<PdkBuilderContext>,
): Promise<PdkBuilderContext> => {
  const rootDir = await mockFileSystem(ctx, fileSystem);

  return createTestContextWithMockedFs(rootDir, config);
};
