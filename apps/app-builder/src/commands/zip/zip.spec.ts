import zip from './index';
import path from 'node:path';
import fs from 'node:fs';
import {describe, expect, it} from 'vitest';
import {resolveString} from '../../utils/resolveString';
import {type PdkBuilderContext} from '../../types/command.types';
import {PdkPlatformName} from '../../constants';
import {fsModifyingMethods} from '../../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../../__tests__/mockFileSystemAndCreateContext';
import {mockFileSystem} from '../../__tests__/mockFileSystem';
import {expectNoFileChanges} from '../../__tests__/expectNoFileChanges';
import {DEFAULT_FILE_SYSTEM} from '../../__tests__/constants';

const mockDistDirectoryFileSystem = (context: PdkBuilderContext) => {
  const outDir: Record<string, unknown> = {};
  const name = resolveString(context.config.name, context);

  context.config.platforms.forEach((platform) => {
    outDir[`${platform}-${name}`] = DEFAULT_FILE_SYSTEM;
  });

  return {
    [context.config.outDir]: outDir,
  };
};

describe('command: zip', () => {
  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethods.length);

    const context = await mockFileSystemAndCreateContext(ctx, undefined, {args: {dryRun: true}});
    await mockFileSystem(ctx, mockDistDirectoryFileSystem(context));

    await zip(context);

    expectNoFileChanges();
  });

  it.for([
    {
      version: '1.0.0',
      archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
      expectedFilename: '[PLATFORM]-test-1.0.0.zip',
    },
    {
      version: '3.0.0-beta',
      archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
      expectedFilename: '[PLATFORM]-test-3.0.0-beta.zip',
    },
    {
      version: 'dev-123-fix/fix-some-bug',
      archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
      expectedFilename: '[PLATFORM]-test-dev-123-fix-fix-some-bug.zip',
    },
  ])('zips files', async ({version, archiveFilename, expectedFilename}, ctx) => {
    expect.assertions(1);

    const platforms = [PdkPlatformName.MyParcelBe, PdkPlatformName.MyParcelNl];

    const context = await mockFileSystemAndCreateContext(ctx, undefined, {
      args: {dryRun: false, version},
      config: {
        archiveFilename,
        platforms,
      },
    });

    await mockFileSystem(ctx, mockDistDirectoryFileSystem(context));

    await zip(context);

    const outDir = path.resolve(context.env.cwd, 'dist');

    const platformDirsAndZips = platforms
      .map((platform) => {
        const zipFilename = expectedFilename.replace('[PLATFORM]', platform);

        return [`${platform}-test`, zipFilename];
      })
      .flat();

    const outDirContents = await fs.promises.readdir(outDir);

    expect(outDirContents).toEqual(platformDirsAndZips);
  });
});
