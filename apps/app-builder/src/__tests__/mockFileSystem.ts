import path from 'node:path';
import fs from 'node:fs';
import {type TaskContext, vi} from 'vitest';
import {assign, isObject} from 'radash';
import {exists} from '../utils/fs/exists';
import {DEFAULT_FILE_SYSTEM, MOCK_ROOT_DIR} from './constants';

const recursiveCreate = async (entries: Record<string, unknown>, rootDir: string): Promise<unknown[]> => {
  return Promise.all(
    Object.entries(entries).map(async ([filePath, contents]) => {
      const fullPath = path.resolve(rootDir, filePath);
      const directory = path.dirname(fullPath);

      if (!(await exists(directory))) {
        await fs.promises.mkdir(directory, {recursive: true});
      }

      if (isObject(contents)) {
        return recursiveCreate(contents as Record<string, unknown>, fullPath);
      }

      if (typeof contents === 'string') {
        await fs.promises.writeFile(fullPath, contents);
      }
    }),
  );
};

export const mockFileSystem = async (ctx: TaskContext, fileSystem?: Record<string, unknown>): Promise<string> => {
  const rootDir = path.resolve(MOCK_ROOT_DIR, `${ctx.task.name}-${ctx.task.id}`.replace(/\s/g, '-'));
  const mergedFileSystem = assign(DEFAULT_FILE_SYSTEM, fileSystem ?? {});

  await recursiveCreate(mergedFileSystem, rootDir);

  // Clear the calls to the filesystem methods before continuing
  vi.clearAllMocks();

  return rootDir;
};
