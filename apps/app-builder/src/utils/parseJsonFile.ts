import fs from 'fs';

export const parseJsonFile = (filePath: string): Record<string, unknown> => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
