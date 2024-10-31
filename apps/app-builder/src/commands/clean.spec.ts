import {describe, expect, it} from 'vitest';
import {exists} from '../utils/fs/exists';
import {fsModifyingMethods} from '../__tests__/spies/fs';
import {mockFileSystemAndCreateContext} from '../__tests__/mockFileSystemAndCreateContext';
import {expectNoFileChanges} from '../__tests__/expectNoFileChanges';
import clean from './clean';

describe('command: clean', () => {
  it('does nothing when dry run is passed', async (ctx) => {
    expect.assertions(fsModifyingMethods.length);

    const context = await mockFileSystemAndCreateContext(ctx, {dist: {'text.txt': ''}}, {args: {dryRun: true}});

    await clean(context);

    expectNoFileChanges();
  });

  it('does nothing when outDir does not exist', async (ctx) => {
    expect.assertions(fsModifyingMethods.length);

    const context = await mockFileSystemAndCreateContext(ctx);

    await clean(context);

    expectNoFileChanges();
  });

  it('cleans dir', async (ctx) => {
    expect.assertions(2);

    const context = await mockFileSystemAndCreateContext(ctx, {dist: {'text.txt': ''}}, {args: {dryRun: false}});

    expect(await exists(`${context.env.cwd}/dist/text.txt`)).toBe(true);

    await clean(context);

    expect(await exists(`${context.env.cwd}/dist/text.txt`)).toBe(false);
  });
});
