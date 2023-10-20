import path from 'path';
import fs from 'fs';
import {afterEach, describe, expect, it, vi} from 'vitest';
import glob from 'fast-glob';
import {PdkPlatformName} from '../types';
import {fsModifyingMethodSpies} from '../__tests__/spies/fs';
import {mockFileSystem, restoreFileSystem} from '../__tests__/mockFileSystem';
import {createTestContext} from '../__tests__/createTestContext';
import {MOCK_ROOT_DIR} from '../__tests__/constants';
import copy from './copy';

describe('command: copy', () => {
  afterEach(async () => {
    await restoreFileSystem();
    vi.restoreAllMocks();
  });

  it('does nothing when dry run is passed', async () => {
    expect.assertions(fsModifyingMethodSpies.length);

    await mockFileSystem({dist: {'text.txt': ''}});

    await copy(createTestContext({args: {dryRun: true}}));

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('copies files', async () => {
    expect.assertions(3);

    await mockFileSystem();

    const platforms = [PdkPlatformName.MyParcelBe, PdkPlatformName.MyParcelNl];

    await copy(
      createTestContext({
        args: {dryRun: false},
        config: {
          name: 'myApp',
          source: ['composer.json', 'package.json', 'src/**/*', 'config/**/*', '!src/index.php'],
          outDir: 'copyResult',
          platforms,
        },
      }),
    );

    const platformDirs = platforms.map((platform) => `${platform}-myApp`);

    const outDir = path.resolve(MOCK_ROOT_DIR, 'copyResult');

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
