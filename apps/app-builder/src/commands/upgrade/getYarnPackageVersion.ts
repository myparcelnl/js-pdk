import fs from 'fs';
import {parseSyml} from '@yarnpkg/parsers';
import {type ParsedEntry, type YarnLockfileEntry} from './types';

export const getYarnPackageVersion = (packageName: string, lockfilePath: string): ParsedEntry[] => {
  const contents = fs.readFileSync(lockfilePath, 'utf8');

  const lockfile = parseSyml(contents);

  const packageRegex = packageName.replace(/\*/g, '.*');

  const matches: YarnLockfileEntry[] = Object.entries(lockfile).filter(([key]) => {
    return new RegExp(`^${packageRegex}@`).exec(key);
  });

  if (matches.length === 0) {
    throw new Error(`Package ${packageName} not found in lockfile ${lockfilePath}`);
  }

  return matches.map(([, value]) => ({
    name: value.resolution.replace(/^(.+?)@.+$/, '$1'),
    version: value.version,
  }));
};
