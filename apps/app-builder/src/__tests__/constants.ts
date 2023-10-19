import path from 'path';

const dirname = new URL('.', import.meta.url).pathname;

export const MOCK_ROOT_DIR = path.resolve(dirname, '../..', '.tmp');
