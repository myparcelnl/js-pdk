import path from 'path';
import fs from 'fs';
import {describe, expect, it} from 'vitest';
import {parseJsonFile} from '../utils';
import {fsModifyingMethodSpies} from '../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../__tests__/mockFileSystemAndCreateContext';
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
  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethodSpies.length);

    const context = await mockFileSystemAndCreateContext(ctx, undefined, {
      args: {dryRun: true},
      config: CONFIG,
    });

    await increment(context);

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('increments files', async (ctx) => {
    expect.assertions(4);

    const context = await mockFileSystemAndCreateContext(
      ctx,
      {
        'custom.json': JSON.stringify({custom: '1.0.0'}),
        'file.txt': ['This is a file.', 'Version: 1.0.0', ''].join('\n'),
      },
      {
        args: {
          dryRun: false,
          version: '1.0.1',
        },
        config: CONFIG,
      },
    );

    await increment(context);

    expect(parseJsonFile(path.resolve(context.env.cwd, 'package.json')).version).toEqual('1.0.1');
    expect(parseJsonFile(path.resolve(context.env.cwd, 'composer.json')).version).toEqual('1.0.1');
    expect(parseJsonFile(path.resolve(context.env.cwd, 'custom.json')).custom).toEqual('1.0.1');
    expect(fs.readFileSync(path.resolve(context.env.cwd, 'file.txt'), 'utf-8')).toEqual(`This is a file.
Version: 1.0.1
`);
  });
});
