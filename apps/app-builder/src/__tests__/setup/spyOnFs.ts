import fs from 'node:fs';
import {vi} from 'vitest';

vi.spyOn(fs, 'appendFile');
vi.spyOn(fs, 'copyFile');
vi.spyOn(fs, 'mkdir');
vi.spyOn(fs, 'rm');
vi.spyOn(fs, 'rmdir');
vi.spyOn(fs, 'unlink');
vi.spyOn(fs, 'writeFile');
vi.spyOn(fs.promises, 'appendFile');
vi.spyOn(fs.promises, 'copyFile');
vi.spyOn(fs.promises, 'mkdir');
vi.spyOn(fs.promises, 'rm');
vi.spyOn(fs.promises, 'rmdir');
vi.spyOn(fs.promises, 'unlink');
vi.spyOn(fs.promises, 'writeFile');
