import fs from 'fs';
import {MOCK_ROOT_DIR} from './constants';

export const restoreFileSystem = async (): Promise<void> => {
  await fs.promises.rm(MOCK_ROOT_DIR, {recursive: true, force: true});
};
