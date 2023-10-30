import {describe, expect, it} from 'vitest';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {type PdkBuilderContext, PdkPlatformName} from '../types';
import {createTestContext} from '../__tests__/createTestContext';
import {getPlatformDistPath} from './getPlatformDistPath';

describe('getPlatformDistPath', () => {
  it.each([
    [{}, '/mock-root-dir/dist/myparcelnl-test'],
    [
      {
        args: {
          name: 'myApp',
          platform: PdkPlatformName.MyParcelBe,
        },
      },
      '/mock-root-dir/dist/myparcelbe-myApp',
    ],
    [
      {
        config: {
          outDir: 'build',
        },
      },
      '/mock-root-dir/build/myparcelnl-test',
    ],
    [
      {
        config: {
          outDir: 'lib',
          platformFolderName: () => '{{platform}}',
        },
      },
      '/mock-root-dir/lib/myparcelnl',
    ],
    [
      {
        config: {
          outDir: 'lib',
          platformFolderName: (platform) => `{{platform}}-${platform}-{{name}}`,
        },
      },
      '/mock-root-dir/lib/myparcelnl-myparcelnl-test',
    ],
  ] satisfies [RecursivePartial<PdkBuilderContext>, string][])('creates dist path with %s -> %s', (context, result) => {
    const path = getPlatformDistPath(
      createTestContext({
        ...context,
        args: {
          platform: PdkPlatformName.MyParcelNl,
          // @ts-expect-error todo
          ...(context.args ?? {}),
        },
        env: {
          cwd: '/mock-root-dir',
        },
      }) as PdkBuilderContext<{platform: PdkPlatformName}>,
    );

    expect(path).toBe(result);
  });
});
