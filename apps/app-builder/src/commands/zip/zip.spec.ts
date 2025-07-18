import zip from './index';
import path from 'node:path';
import fs from 'node:fs';
import {describe, expect, it} from 'vitest';
import {type PdkBuilderContext} from '../../types/command.types';
import {fsModifyingMethods} from '../../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../../__tests__/mockFileSystemAndCreateContext';
import {mockFileSystem} from '../../__tests__/mockFileSystem';
import {expectNoFileChanges} from '../../__tests__/expectNoFileChanges';
import {DEFAULT_FILE_SYSTEM} from '../../__tests__/constants';

const mockDistDirectoryFileSystem = (context: PdkBuilderContext) => {
  return {
    [context.config.outDir]: DEFAULT_FILE_SYSTEM,
  };
};

describe('command: zip', () => {
  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethods.length);

    const context = await mockFileSystemAndCreateContext(ctx, undefined, {
      args: {dryRun: true},
    });
    await mockFileSystem(ctx, mockDistDirectoryFileSystem(context));

    await zip(context);

    expectNoFileChanges();
  });

  it.for([
    {
      version: '1.0.0',
      archiveFilename: '{{name}}-{{version}}.zip',
      expectedFilename: 'test-1.0.0.zip',
    },
    {
      version: '3.0.0-beta',
      archiveFilename: '{{name}}-{{version}}.zip',
      expectedFilename: 'test-3.0.0-beta.zip',
    },
    {
      version: 'dev-123-fix/fix-some-bug',
      archiveFilename: '{{name}}-{{version}}.zip',
      expectedFilename: 'test-dev-123-fix-fix-some-bug.zip',
    },
  ])('zips files', async ({version, archiveFilename, expectedFilename}, ctx) => {
    expect.assertions(1);

    const context = await mockFileSystemAndCreateContext(ctx, undefined, {
      args: {dryRun: false, version},
      config: {
        archiveFilename,
      },
    });

    await mockFileSystem(ctx, mockDistDirectoryFileSystem(context));

    await zip(context);

    const outDir = path.resolve(context.env.cwd, 'dist/test');

    const outDirContents = await fs.promises.readdir(outDir);

    expect(outDirContents).toEqual([expectedFilename]);
  });
});
