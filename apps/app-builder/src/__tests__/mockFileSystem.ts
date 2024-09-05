import path from 'path';
import fs from 'fs';
import {type TestContext, vi} from 'vitest';
import {isObject, merge} from 'lodash-unified';
import {exists} from '../utils/fs/exists';
import {MOCK_ROOT_DIR} from './constants';

const DEFAULT_FILE_SYSTEM = Object.freeze({
  config: {
    'pdk.php': '<?php return [];',
  },
  src: {
    Pdk: {
      'MyParcelNLController.php': '<?php echo "Hello from MyParcelNL";',
    },
    'index.php': '<?php echo "Version: 1.0.0";',
  },
  'composer.json': JSON.stringify({
    name: 'myparcelnl/app',
    version: '1.0.0',
  }),
  'package.json': JSON.stringify({
    name: '@myparcel/app',
    version: '1.0.0',
  }),
  'readme.txt': 'Hello world!',
});

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

export const mockFileSystem = async (ctx: TestContext, fileSystem?: Record<string, unknown>): Promise<string> => {
  const rootDir = path.resolve(MOCK_ROOT_DIR, ctx.task.id);

  await recursiveCreate(merge({}, DEFAULT_FILE_SYSTEM, fileSystem), rootDir);

  vi.restoreAllMocks();

  return rootDir;
};
