import {describe, expect, it} from 'vitest';
import {exists} from '../utils';
import {fsModifyingMethodSpies} from '../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../__tests__/mockFileSystemAndCreateContext';
import clean from './clean';

describe('command: clean', () => {
  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethodSpies.length);

    const context = await mockFileSystemAndCreateContext(ctx, {dist: {'text.txt': ''}}, {args: {dryRun: true}});

    await clean(context);

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('does nothing when outDir does not exist', async (ctx) => {
    expect.assertions(fsModifyingMethodSpies.length);

    const context = await mockFileSystemAndCreateContext(ctx);

    await clean(context);

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('cleans dir', async (ctx) => {
    expect.assertions(2);

    const context = await mockFileSystemAndCreateContext(ctx, {dist: {'text.txt': ''}}, {args: {dryRun: false}});

    expect(await exists(`${context.env.cwd}/dist/text.txt`)).toBe(true);

    await clean(context);

    expect(await exists(`${context.env.cwd}/dist/text.txt`)).toBe(false);
  });
});
