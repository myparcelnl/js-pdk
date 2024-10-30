/* eslint-disable max-nested-callbacks */
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import * as executeCommandModule from '../utils/executeCommand';
import {type PdkBuilderContext} from '../types/command';
import {MYPARCEL_PDK_APP_BUILDER, MYPARCEL_PDK_NPM_GLOB, MYPARCEL_PDK_PACKAGIST_NAME} from '../constants';
import {fsModifyingMethodSpies} from '../__tests__/spies/fs';
import {createTestContext} from '../__tests__/createTestContext';
import {type UpgradeCommandArgs} from './upgrade/types';
import upgrade from './upgrade';

describe('command: upgrade', () => {
  const composerShowSpy = vi.fn(() => '{"name":"myparcelnl/pdk","source":{"url":""},"versions":["1.0.0"]}');
  const composerRequireSpy = vi.fn(() => '');
  const yarnInfoSpy = vi.fn(() => '{}');
  const yarnUpgradeSpy = vi.fn(() => '');

  const spyMap = {
    'composer show': composerShowSpy,
    'composer require': composerRequireSpy,
    'yarn info': yarnInfoSpy,
    'yarn up': yarnUpgradeSpy,
  };

  beforeEach(() => {
    vi.spyOn(executeCommandModule, 'executeCommand').mockImplementation((_, command, args) => {
      const fullCommand = `${command} ${args?.join(' ')}`.trim();
      const match = Object.entries(spyMap).find(([key]) => fullCommand.startsWith(`${key} `));

      // @ts-expect-error todo
      return Promise.resolve(match?.[1](command, args) ?? '');
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing when dry run is passed', async () => {
    expect.assertions(fsModifyingMethodSpies.length);

    const context = createTestContext<PdkBuilderContext<UpgradeCommandArgs>>({
      args: {
        arguments: [MYPARCEL_PDK_PACKAGIST_NAME],
        dryRun: true,
      },
    });

    await upgrade(context);

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('upgrades composer dependency', async () => {
    expect.assertions(4);

    const context = createTestContext<PdkBuilderContext<UpgradeCommandArgs>>({
      args: {
        arguments: [MYPARCEL_PDK_PACKAGIST_NAME],
      },
    });

    await upgrade(context);

    expect(composerShowSpy).toHaveBeenCalledWith('composer', ['show', '--format=json', MYPARCEL_PDK_PACKAGIST_NAME]);
    expect(composerRequireSpy).toHaveBeenCalledWith('composer', ['require', MYPARCEL_PDK_PACKAGIST_NAME]);

    expect(yarnInfoSpy).not.toHaveBeenCalled();
    expect(yarnUpgradeSpy).not.toHaveBeenCalled();
  });

  it.each([
    [MYPARCEL_PDK_APP_BUILDER, `"${MYPARCEL_PDK_APP_BUILDER}@npm:1.2.3"`],
    [MYPARCEL_PDK_NPM_GLOB, ['"@myparcel-pdk/package-a@npm:1.2.3"', '"@myparcel-pdk/package-a@npm:4.5.6"'].join('\n')],
  ])('upgrades yarn dependencies with %s', async (packageName, infoString) => {
    expect.assertions(4);

    yarnInfoSpy.mockReturnValue(infoString);

    const context = createTestContext<PdkBuilderContext<UpgradeCommandArgs>>({
      args: {
        arguments: [packageName],
      },
    });

    await upgrade(context);

    expect(yarnInfoSpy).toHaveBeenCalledWith('yarn', ['info', '--all', '--name-only', '--json']);
    expect(yarnUpgradeSpy).toHaveBeenCalledWith('yarn', ['up', '-R', packageName]);
    expect(composerRequireSpy).not.toHaveBeenCalled();
    expect(composerShowSpy).not.toHaveBeenCalled();
  });
});
