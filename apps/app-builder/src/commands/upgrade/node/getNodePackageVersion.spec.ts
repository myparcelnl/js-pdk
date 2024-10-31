/* eslint-disable max-nested-callbacks */
import {describe, expect, it, vi} from 'vitest';
import {toArray} from '@myparcel/ts-utils';
import {type PdkBuilderUpgradeContext} from '../upgrade.types';
import {NodePackageManager, UpgradeMode} from '../enums';
import {createTestContext} from '../../../__tests__/createTestContext';
import {getNodePackageVersion} from './getNodePackageVersion';

const mockStdout = vi.fn(() => '');

// mock spawnSync
vi.mock('child_process', () => ({
  spawnSync: () => ({
    status: 0,
    stdout: mockStdout(),
  }),
}));

type TestInput = {
  packageManager: NodePackageManager;
  stdout: string | string[];
};

describe('getNodePackageVersion', () => {
  it.each([
    {
      packageManager: NodePackageManager.Yarn,
      stdout: [
        '"@myparcel-eslint/eslint-config-node@npm:1.3.1"',
        '"@myparcel-pdk/admin@npm:1.0.0-alpha.109"',
        '"@myparcel-pdk/app-builder@npm:1.0.0-alpha.36"',
        '"@myparcel-pdk/checkout@npm:1.0.0-alpha.67"',
        '"@myparcel/ts-utils@npm:1.0.0"',
        '"eslint@npm:8.0.0"',
      ],
    },
    {
      packageManager: NodePackageManager.Bun,
      stdout: [
        '/path/to/project node_modules',
        '├── @myparcel-eslint/eslint-config-node@1.3.1',
        '├── @myparcel-pdk/admin@1.0.0-alpha.109',
        '├── @myparcel-pdk/app-builder@1.0.0-alpha.36',
        '├── @myparcel-pdk/checkout@1.0.0-alpha.67',
        '├── @myparcel/ts-utils@1.0.0',
        '└── eslint@8.0.0',
      ],
    },
  ] satisfies TestInput[])(
    'should return the correct package version for $packageManager',
    async ({packageManager, stdout}) => {
      const context = createTestContext<PdkBuilderUpgradeContext>({
        config: {
          nodePackageManager: packageManager,
        },
        lockfilePath: 'yarn.lock',
        mode: UpgradeMode.Node,
        packageName: '@myparcel-pdk/*',
      });

      mockStdout.mockImplementationOnce(() => toArray(stdout).join('\n'));

      const res = await getNodePackageVersion(context);

      expect(res).toEqual([
        {
          name: '@myparcel-pdk/admin',
          version: '1.0.0-alpha.109',
        },
        {
          name: '@myparcel-pdk/app-builder',
          version: '1.0.0-alpha.36',
        },
        {
          name: '@myparcel-pdk/checkout',
          version: '1.0.0-alpha.67',
        },
      ]);
    },
  );
});
