import fs from 'fs';
import {MOCK_ROOT_DIR} from './constants';

const restoreFileSystem = async () => {
  await fs.promises.rm(MOCK_ROOT_DIR, {recursive: true, force: true});
};

export const teardown = async (): Promise<void> => {
  await restoreFileSystem();
};

export const setup = async (): Promise<void> => {
  await restoreFileSystem();
};
