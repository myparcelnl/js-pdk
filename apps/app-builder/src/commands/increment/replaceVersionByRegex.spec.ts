import {describe, expect, it} from 'vitest';
import {createTestContext} from '../../__tests__/createTestContext';
import {replaceVersionByRegex} from './replaceVersionByRegex';
import {type RegexVersionSource, type VersionReplacerInput} from './increment.types';

interface TestInput {
  input: VersionReplacerInput<RegexVersionSource>;
  output: {
    existingVersion: string | undefined;
    newContents: string;
  };
}

describe('replaceVersionByRegex', () => {
  it.each([
    {
      input: {
        match: {
          regex: /"version": "(.+)"/,
          path: 'package.json',
        },
        contents: `\n{\n  "name": "test",\n  "version": "1.0.0",\n  "description": "test"\n}\n`,
        newVersion: '1.2.3',
      },
      output: {
        existingVersion: '1.0.0',
        newContents: `\n{\n  "name": "test",\n  "version": "1.2.3",\n  "description": "test"\n}\n`,
      },
    },
    {
      input: {
        match: {
          regex: 'version: (.+)',
          path: 'package.yaml',
        },
        contents: `name: test\nversion: 1.2.2-beta.1\ndescription: test\n`,
        newVersion: '1.2.3',
      },
      output: {
        existingVersion: '1.2.2-beta.1',
        newContents: `name: test\nversion: 1.2.3\ndescription: test\n`,
      },
    },
    {
      input: {
        match: {
          regex: /VERSION = "(.+)"/,
          path: 'version.py',
        },
        contents: `HELLO = 1\nVERSION = "1.2.2-beta.1"\nWORLD = 2\n`,
        newVersion: '2.2.2-RC.1',
      },
      output: {
        existingVersion: '1.2.2-beta.1',
        newContents: `HELLO = 1\nVERSION = "2.2.2-RC.1"\nWORLD = 2\n`,
      },
    },
  ] satisfies TestInput[])('should replace version', ({input, output}: TestInput) => {
    const result = replaceVersionByRegex(input, createTestContext());

    expect(result).toEqual(output);
  });
});
