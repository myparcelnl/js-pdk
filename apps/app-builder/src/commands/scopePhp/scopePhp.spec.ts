import scopePhp from './index';
import * as child_process from 'child_process';
import {describe, expect, it, vi} from 'vitest';
import {resolveString} from '../../utils/resolveString';
import {type PdkBuilderContext} from '../../types/command';
import {fsModifyingMethodSpies} from '../../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../../__tests__/mockFileSystemAndCreateContext';
import {PACKAGE_NAME} from './constants';

const mockStdout = vi.fn(() => '');

const getScoperInstallArgs = (context: PdkBuilderContext) => {
  const {installDir, version} = context.config.phpScoper;

  return [
    'composer',
    expect.arrayContaining([
      'require',
      `--working-dir=${resolveString(installDir, context)}`,
      `${PACKAGE_NAME}:${version}`,
      '--ignore-platform-req=ext-*',
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
  it("installs php scoper if it isn't installed yet", async (ctx) => {
    expect.assertions(3);
    const INSTALL_DIR = '.scoped/php-scoper';

    const context = await mockFileSystemAndCreateContext(
      ctx,
      {
        'scoper2.inc.php': '<?php return [];',
        'scoper2.vendor.inc.php': '<?php return [];',
      },
      {
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
      },
    );

    await scopePhp(context);
    const {outDir, vendorOutDir} = context.config.phpScoper;

    expect(child_process.spawnSync).toHaveBeenNthCalledWith(1, ...getScoperInstallArgs(context));
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(2, ...getScoperRunArgs(vendorOutDir, context));
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(3, ...getScoperRunArgs(outDir, context));
  });

  it('skips install if php scoper is already installed', async (ctx) => {
    expect.assertions(2);
    const context = await mockFileSystemAndCreateContext(
      ctx,
      {
        '.tmp': {
          'php-scoper': {
            'composer.json': '{}',
          },
        },
        'scoper.inc.php': '<?php return [];',
      },
      {
        config: {
          phpScoper: {
            installDir: '.tmp/php-scoper',
          },
        },
      },
    );

    await scopePhp(context);

    const {outDir} = context.config.phpScoper;

    expect(child_process.spawnSync).not.toHaveBeenCalledWith(...getScoperInstallArgs(context));
    expect(child_process.spawnSync).toHaveBeenNthCalledWith(1, ...getScoperRunArgs(outDir, context));
  });

  it('does not do anything if php scoper is disabled', async (ctx) => {
    expect.assertions(1);

    const context = await mockFileSystemAndCreateContext(
      ctx,
      {
        'scoper.inc.php': '<?php return [];',
      },
      {config: {phpScoper: {enabled: false}}},
    );

    await scopePhp(context);

    expect(child_process.spawnSync).not.toHaveBeenCalled();
  });

  it('does not do anything if no config is found', async (ctx) => {
    expect.assertions(1);

    const context = await mockFileSystemAndCreateContext(ctx);

    await scopePhp(context);

    expect(child_process.spawnSync).not.toHaveBeenCalled();
  });

  it('throws error if php scoper is enabled but config file does not exist', async (ctx) => {
    expect.assertions(1);
    const context = await mockFileSystemAndCreateContext(
      ctx,
      {
        'scoper.inc.php': '<?php return [];',
      },
      {
        config: {phpScoper: {enabled: true, configFile: 'non-existing-file.php'}},
      },
    );

    await expect(() => scopePhp(context)).rejects.toThrowError(
      'File non-existing-file.php not found in root of project',
    );
  });

  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethodSpies.length);

    const context = await mockFileSystemAndCreateContext(ctx, {dist: {'text.txt': ''}}, {args: {dryRun: true}});

    await scopePhp(context);

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
