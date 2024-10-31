import fs from 'node:fs';

export const fsModifyingMethods = [
  fs.appendFile,
  fs.copyFile,
  fs.mkdir,
  fs.rm,
  fs.rmdir,
  fs.unlink,
  fs.writeFile,
  fs.promises.appendFile,
  fs.promises.copyFile,
  fs.promises.mkdir,
  fs.promises.rm,
  fs.promises.rmdir,
  fs.promises.unlink,
  fs.promises.writeFile,
] as const;
