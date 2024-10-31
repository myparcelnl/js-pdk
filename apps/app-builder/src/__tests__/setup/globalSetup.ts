import fs from 'node:fs';
import {MOCK_ROOT_DIR} from '../constants';

const restoreFileSystem = async () => {
  await fs.promises.rm(MOCK_ROOT_DIR, {recursive: true, force: true});
};

// noinspection JSUnusedGlobalSymbols
export const teardown = async (): Promise<void> => {
  await restoreFileSystem();
};

// noinspection JSUnusedGlobalSymbols
export const setup = async (): Promise<void> => {
  await restoreFileSystem();
};
