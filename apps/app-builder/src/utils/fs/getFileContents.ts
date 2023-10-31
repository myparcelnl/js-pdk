import fs from 'fs';

export const getFileContents = async (filePath: string): Promise<string> => {
  return (await fs.promises.readFile(filePath)).toString('utf-8');
};
