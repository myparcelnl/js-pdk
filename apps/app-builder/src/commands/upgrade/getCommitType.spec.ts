import {describe, expect, it} from 'vitest';
import {COMMIT_TYPE_AUTO} from '../../constants';
import {createTestContext} from '../../__tests__/createTestContext';
import {type UpgradedEntry} from './types';
import {getCommitType} from './getCommitType';

type TestInput = {
  commitType: string;
  versions: UpgradedEntry[];
  result: string;
};

const createEntry = (newVersion: string, oldVersion?: string): UpgradedEntry => {
  return {name: 'test', repository: '', oldVersion, version: newVersion};
};

describe('getCommitType', () => {
  it.each([
    {
      commitType: 'chore',
      versions: [createEntry('1.0.1', '1.0.0')],
      result: 'chore',
    },
    {
      commitType: 'chore',
      versions: [createEntry('1.1.0', '1.0.0')],
      result: 'chore',
    },
    {
      commitType: COMMIT_TYPE_AUTO,
      versions: [createEntry('1.0.1', '1.0.0'), createEntry('3.40.3', '3.40.0'), createEntry('4.14.3', '4.14.0')],
      result: 'fix',
    },
    {
      commitType: COMMIT_TYPE_AUTO,
      versions: [createEntry('1.1.0', '1.0.0')],
      result: 'feat',
    },
    {
      commitType: COMMIT_TYPE_AUTO,
      versions: [createEntry('1.1.0', '1.0.0'), createEntry('3.0.0', '2.0.0'), createEntry('4.14.3', '4.14.0')],
      result: 'feat',
    },
    {
      commitType: COMMIT_TYPE_AUTO,
      versions: [createEntry('1.1.0'), createEntry('3.0.1', '3.0.0')],
      result: 'feat',
    },
    {
      commitType: COMMIT_TYPE_AUTO,
      versions: [createEntry('1.0.0-alpha.62', '1.0.0-alpha.60')],
      result: 'feat',
    },
  ] satisfies TestInput[])('returns string', ({commitType, versions, result}) => {
    const context = createTestContext({config: {commitType}});

    expect(getCommitType(context, versions)).toBe(result);
  });
});
