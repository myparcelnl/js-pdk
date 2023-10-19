// make a spy for all methods on fs.promises that modify the file system
import fs from 'fs';
import {vi} from 'vitest';

const fsAppendFile = vi.spyOn(fs, 'appendFile');
const fsCopyFile = vi.spyOn(fs, 'copyFile');
const fsMkdir = vi.spyOn(fs, 'mkdir');
const fsRm = vi.spyOn(fs, 'rm');
const fsRmdir = vi.spyOn(fs, 'rmdir');
const fsUnlink = vi.spyOn(fs, 'unlink');
const fsWriteFile = vi.spyOn(fs, 'writeFile');

const fsPromisesAppendFile = vi.spyOn(fs.promises, 'appendFile');
const fsPromisesCopyFile = vi.spyOn(fs.promises, 'copyFile');
const fsPromisesMkdir = vi.spyOn(fs.promises, 'mkdir');
const fsPromisesRm = vi.spyOn(fs.promises, 'rm');
const fsPromisesRmdir = vi.spyOn(fs.promises, 'rmdir');
const fsPromisesUnlink = vi.spyOn(fs.promises, 'unlink');
const fsPromisesWriteFile = vi.spyOn(fs.promises, 'writeFile');

export const fsModifyingMethodSpies = [
  fsAppendFile,
  fsCopyFile,
  fsMkdir,
  fsRm,
  fsRmdir,
  fsUnlink,
  fsWriteFile,
  fsPromisesAppendFile,
  fsPromisesCopyFile,
  fsPromisesMkdir,
  fsPromisesRm,
  fsPromisesRmdir,
  fsPromisesUnlink,
  fsPromisesWriteFile,
] as const;
