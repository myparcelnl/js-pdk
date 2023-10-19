import path from 'path';
import fs from 'fs';
import {vi} from 'vitest';
import {isObject, merge} from 'lodash-unified';
import {createDirectory, exists} from '../utils';
import {MOCK_ROOT_DIR} from './constants';

type Directories = Record<string, unknown>;

const recursiveCreate = async (entries: Record<string, unknown>, rootDir = MOCK_ROOT_DIR): Promise<unknown[]> => {
  return Promise.all(
    Object.entries(entries).map(async ([filePath, contents]) => {
      const fullPath = path.resolve(rootDir, filePath);
      const directory = path.dirname(fullPath);

      await createDirectory(directory, {recursive: true});

      if (isObject(contents)) {
        return recursiveCreate(contents as Record<string, unknown>, fullPath);
      }

      if (typeof contents === 'string') {
        await fs.promises.writeFile(fullPath, contents);
      }
    }),
  );
};

export const mockFileSystem = async (fileSystem?: Directories): Promise<void> => {
  const base = {
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
  };

  if (await exists(MOCK_ROOT_DIR)) {
    await restoreFileSystem();
  }

  await recursiveCreate(merge({}, base, fileSystem));

  vi.restoreAllMocks();
};

export const restoreFileSystem = async (): Promise<void> => {
  await fs.promises.rm(MOCK_ROOT_DIR, {recursive: true});
};
