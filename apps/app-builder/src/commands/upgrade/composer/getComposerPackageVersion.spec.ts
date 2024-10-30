import {afterEach, describe, expect, it, vi} from 'vitest';
import {type PdkBuilderUpgradeContext, UpgradeMode} from '../types';
import * as executeCommandModule from '../../../utils/executeCommand';
import {MYPARCEL_PDK_PACKAGIST_NAME} from '../../../constants';
import {createTestContext} from '../../../__tests__/createTestContext';
import {getComposerPackageVersion} from './getComposerPackageVersion';

const COMPOSER_SHOW_RETURN = JSON.stringify({
  // Only the relevant fields are included
  name: MYPARCEL_PDK_PACKAGIST_NAME,
  versions: ['2.45.0'],
  source: {
    url: `https://github.com/${MYPARCEL_PDK_PACKAGIST_NAME}.git`,
  },
});

describe('getComposerPackageVersion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    '',
    // Composer warnings are output before the json, so we need to check if that's handled correctly
    `\n\nCOMPOSER_IGNORE_PLATFORM_REQ is set to ignore ext-*,lib-*. You may experience unexpected errors.\n`,
  ])('gets version from composer.json', async (outputStart) => {
    const executeCommandSpy = vi.spyOn(executeCommandModule, 'executeCommand');

    executeCommandSpy.mockReturnValue(Promise.resolve(outputStart + COMPOSER_SHOW_RETURN));

    const context = createTestContext<PdkBuilderUpgradeContext>({
      mode: UpgradeMode.Composer,
      packageName: 'myparcelnl/pdk',
    });

    const result = await getComposerPackageVersion(context);

    expect(result).toEqual([
      {
        name: MYPARCEL_PDK_PACKAGIST_NAME,
        repository: `https://github.com/${MYPARCEL_PDK_PACKAGIST_NAME}`,
        version: '2.45.0',
      },
    ]);
  });
});
