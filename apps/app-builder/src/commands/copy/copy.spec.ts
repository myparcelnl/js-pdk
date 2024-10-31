import copy from './index';
import path from 'node:path';
import fs from 'node:fs';
import {describe, expect, it} from 'vitest';
import glob from 'fast-glob';
import {PdkPlatformName} from '../../constants';
import {fsModifyingMethods} from '../../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../../__tests__/mockFileSystemAndCreateContext';
import {expectNoFileChanges} from '../../__tests__/expectNoFileChanges';

describe('command: copy', () => {
  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethods.length);

    const context = await mockFileSystemAndCreateContext(ctx, {dist: {'text.txt': ''}}, {args: {dryRun: true}});

    await copy(context);

    expectNoFileChanges();
  });

  it('copies files', async (ctx) => {
    expect.assertions(3);

    const platforms = [PdkPlatformName.MyParcelBe, PdkPlatformName.MyParcelNl];

    const context = await mockFileSystemAndCreateContext(ctx, undefined, {
      args: {dryRun: false},
      config: {
        source: ['composer.json', 'package.json', 'src/**/*', 'config/**/*', '!src/index.php'],
        outDir: 'copyResult',
        platforms,
      },
    });

    await copy(context);

    const platformDirs = platforms.map((platform) => `${platform}-test`);

    const outDir = path.resolve(context.env.cwd, 'copyResult');

    expect(await fs.promises.readdir(outDir)).toEqual(platformDirs);

    platformDirs.forEach((platformDir) => {
      const files = glob.sync('**/*', {cwd: path.resolve(outDir, platformDir)});

      expect(files).toEqual([
        'composer.json',
        'package.json',
        'config/pdk.php',
        // src/index.php is excluded
        'src/Pdk/MyParcelNLController.php',
      ]);
    });
  });
});
