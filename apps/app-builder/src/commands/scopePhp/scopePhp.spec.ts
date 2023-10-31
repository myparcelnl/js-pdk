import scopePhp from './index';
import * as child_process from 'child_process';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {resolveString} from '../../utils';
import {type PdkBuilderContext} from '../../types';
import {fsModifyingMethodSpies} from '../../__tests__/spies/fs';
import {mockFileSystem, restoreFileSystem} from '../../__tests__/mockFileSystem';
import {createTestContext} from '../../__tests__/createTestContext';
import {MOCK_ROOT_DIR} from '../../__tests__/constants';
import {PACKAGE_NAME} from './constants';

const mockStdout = vi.fn(() => '');

const ARGS_COMPOSER_INSTALL = [
  'composer',
  expect.arrayContaining(['install', '--no-dev']),
  expect.objectContaining({cwd: MOCK_ROOT_DIR}),
];

const getScoperInstallArgs = (context: PdkBuilderContext) => {
  const {installDir, version} = context.config.phpScoper;

  return [
    'composer',
    expect.arrayContaining([
      'require',
      `--working-dir=${resolveString(installDir, context)}`,
      `${PACKAGE_NAME}:${version}`,
    ]),
    expect.any(Object),
  ] as const;
};

const getScoperRunArgs = (outDir: string, context: PdkBuilderContext) => {
  return [
    'php',
    expect.arrayContaining([
      resolveString(`${context.config.phpScoper.installDir}/vendor/bin/php-scoper`, context),
      'add-prefix',
      `--output-dir=${resolveString(outDir, context)}`,
    ]),
    expect.any(Object),
  ] as const;
};

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
    expect.assertions(4);
    const INSTALL_DIR = '.scoped/php-scoper';

    await mockFileSystem({
      'scoper2.inc.php': '<?php return [];',
      'scoper2.vendor.inc.php': '<?php return [];',
    });

    const context = createTestContext({
      config: {
        phpScoper: {
          configFile: 'scoper2.inc.php',
          installDir: INSTALL_DIR,
          outDir: '.scoped/source',
          vendorConfigFile: 'scoper2.vendor.inc.php',
          vendorOutDir: '.scoped/vendor',
          version: '^0.17.0',
        },
      },
    });

    await scopePhp(context);
    const {outDir, vendorOutDir} = context.config.phpScoper;

    expect(child_process.spawnSync).toHaveBeenNthCalledWith(1, ...ARGS_COMPOSER_INSTALL);
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(2, ...getScoperInstallArgs(context));
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(3, ...getScoperRunArgs(vendorOutDir, context));
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(4, ...getScoperRunArgs(outDir, context));
  });

  it('skips install if php scoper is already installed', async () => {
    expect.assertions(3);
    await mockFileSystem({
      '.tmp': {
        'php-scoper': {
          'composer.json': '{}',
        },
      },
      'scoper.inc.php': '<?php return [];',
    });

    const context = createTestContext({
      config: {
        phpScoper: {
          installDir: '.tmp/php-scoper',
        },
      },
    });

    await scopePhp(context);

    const {outDir} = context.config.phpScoper;

    expect(child_process.spawnSync).not.toHaveBeenCalledWith(...getScoperInstallArgs(context));
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(1, ...ARGS_COMPOSER_INSTALL);
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(2, ...getScoperRunArgs(outDir, context));
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
