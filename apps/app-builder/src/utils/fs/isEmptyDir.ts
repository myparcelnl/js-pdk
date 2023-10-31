import fs from 'fs';

export const isEmptyDir = async (dir: string): Promise<boolean> => {
  const files = await fs.promises.readdir(dir);

  return files.length === 0;
};
