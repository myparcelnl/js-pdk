import fs from 'node:fs';

export const exists = async (path: string): Promise<boolean> => {
  try {
    return Boolean(await fs.promises.stat(path));
  } catch (error) {
    return false;
  }
};
