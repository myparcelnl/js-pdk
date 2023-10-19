import {afterEach, describe, expect, it, vi} from 'vitest';
import {exists} from '../utils';
import {fsModifyingMethodSpies} from '../__tests__/spies/fs';
import {mockFileSystem, restoreFileSystem} from '../__tests__/mockFileSystem';
import {createTestContext} from '../__tests__/createTestContext';
import {MOCK_ROOT_DIR} from '../__tests__/constants';
import clean from './clean';

describe('command: clean', () => {
  afterEach(async () => {
    await restoreFileSystem();
    vi.restoreAllMocks();
  });

  it('does nothing when dry run is passed', async () => {
    expect.assertions(fsModifyingMethodSpies.length);

    await mockFileSystem({dist: {'text.txt': ''}});

    await clean(createTestContext({args: {dryRun: true}}));

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('does nothing when outDir does not exist', async () => {
    expect.assertions(fsModifyingMethodSpies.length);

    await mockFileSystem();

    await clean(createTestContext());

    fsModifyingMethodSpies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('cleans dir', async () => {
    expect.assertions(2);

    await mockFileSystem({dist: {'text.txt': ''}});

    expect(await exists(`${MOCK_ROOT_DIR}/dist/text.txt`)).toBe(true);

    await clean(createTestContext({args: {dryRun: false}}));

    expect(await exists(`${MOCK_ROOT_DIR}/dist/text.txt`)).toBe(false);
  });
});
