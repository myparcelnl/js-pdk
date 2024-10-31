import {describe, expect, it} from 'vitest';
import {createTestContext} from '../../__tests__/createTestContext';
import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './upgrade.types';
import {UpgradeMode} from './enums';
import {createCommitMessage} from './createCommitMessage';

describe('createCommitMessage', () => {
  it('creates commit message for a single node dependency', () => {
    const upgradedVersions = [
      {
        name: 'vue',
        version: '3.3.0',
        oldVersion: '3.2.0',
        repository: 'https://github.com/vuejs/vue',
      },
    ] satisfies UpgradedEntry[];

    const context = createTestContext<PdkBuilderUpgradeContext>({
      mode: UpgradeMode.Node,
      packageName: 'vue',
    });

    const commitMessage = createCommitMessage(context, upgradedVersions);

    expect(commitMessage).toEqual(`feat(deps): upgrade vue to v3.3.0

Compare changes:
- https://github.com/vuejs/vue/compare/v3.2.0...v3.3.0`);
  });

  it('creates commit message for multiple node dependencies', () => {
    const entries = [
      {
        name: '@myparcel-pdk/app-builder',
        version: '1.1.5',
        oldVersion: '1.1.1',
      },
      {
        name: '@myparcel-pdk/admin',
        version: '1.1.2',
        oldVersion: '1.1.1',
      },
    ] satisfies UpgradedEntry[];

    const context = createTestContext<PdkBuilderUpgradeContext>({
      mode: UpgradeMode.Node,
      packageName: '@myparcel-pdk/*',
    });

    const commitMessage = createCommitMessage(context, entries);

    expect(commitMessage).toEqual(`fix(deps): upgrade @myparcel-pdk/*

- upgrade @myparcel-pdk/app-builder to v1.1.5
- upgrade @myparcel-pdk/admin to v1.1.2`);
  });
});
