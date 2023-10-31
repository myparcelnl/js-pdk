import * as child_process from 'child_process';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {fsModifyingMethodSpies} from '../../__tests__/spies/fs';
import {mockFileSystem, restoreFileSystem} from '../../__tests__/mockFileSystem';
import {createTestContext} from '../../__tests__/createTestContext';
import scopePhp from './scopePhp';

const mockStdout = vi.fn(() => '');

const ARGS_SCOPER_INSTALL = ['composer', expect.arrayContaining(['require']), expect.any(Object)] as const;

const ARGS_SCOPER_RUN = [
  'php',
  expect.arrayContaining(['vendor/bin/php-scoper', 'add-prefix']),
  expect.any(Object),
] as const;

vi.mock('child_process', () => ({
  spawnSync: vi.fn(() => ({
    status: 0,
    stdout: mockStdout(),
  })),
}));

describe('command: scopePhp', () => {
  afterEach(async () => {
    await restoreFileSystem();
    vi.restoreAllMocks();
  });

  it("installs php scoper if it isn't installed yet", async () => {
    expect.assertions(2);
    const INSTALL_DIR = '.scoped/php-scoper';

    await mockFileSystem({
      'scoper2.inc.php': '<?php return [];',
    });

    await scopePhp(
      createTestContext({
        config: {
          phpScoper: {
            configFile: 'scoper2.inc.php',
            installDir: INSTALL_DIR,
            outDir: '.scoped/build',
            version: '^0.17.0',
          },
        },
      }),
    );

    expect(child_process.spawnSync).toHaveBeenNthCalledWith(
      1,
      ...([
        'composer',
        expect.arrayContaining(['require', 'humbug/php-scoper:^0.17.0']),
        expect.objectContaining({cwd: expect.stringContaining(INSTALL_DIR)}),
      ] as const),
    );
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(
      2,
      ...([
        'php',
        expect.arrayContaining([
          'vendor/bin/php-scoper',
          'add-prefix',
          expect.stringMatching(/--output-dir=[^ ]+\/\.scoped\/build/),
        ]),
        expect.objectContaining({cwd: expect.stringContaining(INSTALL_DIR)}),
      ] as const),
    );
  });

  it('skips install if php scoper is already installed', async () => {
    expect.assertions(2);
    await mockFileSystem({
      '.tmp': {
        'php-scoper': {
          'composer.json': '{}',
        },
      },
      'scoper.inc.php': '<?php return [];',
    });

    await scopePhp(
      createTestContext({
        config: {
          phpScoper: {
            installDir: '.tmp/php-scoper',
          },
        },
      }),
    );

    expect(child_process.spawnSync).not.toHaveBeenCalledWith(...ARGS_SCOPER_INSTALL);
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(1, ...ARGS_SCOPER_RUN);
  });

  it('does not do anything if php scoper is disabled', async () => {
    expect.assertions(1);
    await mockFileSystem({
      'scoper.inc.php': '<?php return [];',
    });

    await scopePhp(createTestContext({config: {phpScoper: {enabled: false}}}));

    expect(child_process.spawnSync).not.toHaveBeenCalled();
  });

  it('does not do anything if no config is found', async () => {
    expect.assertions(1);
    await mockFileSystem();

    await scopePhp(createTestContext());

    expect(child_process.spawnSync).not.toHaveBeenCalled();
  });

  it('throws error if php scoper is enabled but config file does not exist', async () => {
    expect.assertions(1);
    await mockFileSystem({
      'scoper.inc.php': '<?php return [];',
    });

    await expect(() =>
      scopePhp(createTestContext({config: {phpScoper: {enabled: true, configFile: 'non-existing-file.php'}}})),
    ).rejects.toThrowError('File non-existing-file.php not found in root of project');
  });

  it('does nothing when dry run is passed', async () => {
    expect.assertions(fsModifyingMethodSpies.length);

    await mockFileSystem({dist: {'text.txt': ''}});

    await scopePhp(createTestContext({args: {dryRun: true}}));

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
