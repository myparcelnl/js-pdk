import path from 'path';
import fs from 'fs';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {parseJsonFile} from '../utils';
import {fsModifyingMethodSpies} from '../__tests__/spies/fs';
import {mockFileSystem, restoreFileSystem} from '../__tests__/mockFileSystem';
import {createTestContext} from '../__tests__/createTestContext';
import {MOCK_ROOT_DIR} from '../__tests__/constants';
import increment from './increment';

const CONFIG = Object.freeze({
  versionSource: [
    {path: 'package.json'},
    {path: 'composer.json'},
    {
      path: 'custom.json',
      key: 'custom',
    },
    {
      path: 'file.txt',
      regex: /Version: (.+)/,
    },
  ],
});

describe('command: increment', () => {
  afterEach(async () => {
    await restoreFileSystem();
    vi.restoreAllMocks();
  });

  it('does nothing when dry run is passed', async () => {
    expect.assertions(fsModifyingMethodSpies.length);

    await mockFileSystem();

    await increment(
      createTestContext({
        args: {dryRun: true},
        config: CONFIG,
      }),
    );

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('increments files', async () => {
    expect.assertions(4);

    await mockFileSystem({
      'custom.json': JSON.stringify({custom: '1.0.0'}),
      'file.txt': ['This is a file.', 'Version: 1.0.0', ''].join('\n'),
    });

    await increment(
      createTestContext({
        args: {
          dryRun: false,
          version: '1.0.1',
        },
        config: CONFIG,
      }),
    );

    expect(parseJsonFile(path.resolve(MOCK_ROOT_DIR, 'package.json')).version).toEqual('1.0.1');
    expect(parseJsonFile(path.resolve(MOCK_ROOT_DIR, 'composer.json')).version).toEqual('1.0.1');
    expect(parseJsonFile(path.resolve(MOCK_ROOT_DIR, 'custom.json')).custom).toEqual('1.0.1');
    expect(fs.readFileSync(path.resolve(MOCK_ROOT_DIR, 'file.txt'), 'utf-8')).toEqual(`This is a file.
Version: 1.0.1
`);
  });
});
