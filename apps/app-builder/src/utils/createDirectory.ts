import {type MakeDirectoryOptions} from 'node:fs';
import fs from 'fs';
import {exists} from './exists';

export const createDirectory = async (directory: string, options: MakeDirectoryOptions): Promise<void> => {
  if (await exists(directory)) {
    return;
  }

  await fs.promises.mkdir(directory, options);
};
