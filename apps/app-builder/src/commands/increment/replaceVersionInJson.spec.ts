import {describe, expect, it} from 'vitest';
import {DEFAULT_JSON_SPACES} from '../../constants';
import {createTestContext} from '../../__tests__/createTestContext';
import {replaceVersionInJson} from './replaceVersionInJson';
import {type JsonVersionSource, type VersionReplacerInput} from './increment.types';

interface TestInput {
  name: string;
  input: VersionReplacerInput<JsonVersionSource>;
  output: {
    existingVersion: string | undefined;
    newContents: string;
  };
}

describe('replaceVersionInJson', () => {
  it.each([
    {
      name: 'simple package.json',
      input: {
        match: {
          path: '',
        },
        contents: `\n{\n  "name": "test",\n  "version": "1.0.0",\n  "description": "test"\n}\n`,
        newVersion: '1.2.3',
      },
      output: {
        existingVersion: '1.0.0',
        // stringified json ,
        newContents: `${JSON.stringify(
          {name: 'test', version: '1.2.3', description: 'test'},
          null,
          DEFAULT_JSON_SPACES,
        )}\n`,
      },
    },
    {
      name: 'json file with other key',
      input: {
        match: {
          path: '',
          key: 'otherKey',
        },
        contents: `\n{\n  "name": "test",\n  "otherKey": "52.33.2123-rc.0",\n  "description": "test"\n}\n`,
        newVersion: '2.0.0-beta.1',
      },
      output: {
        existingVersion: '52.33.2123-rc.0',
        newContents: `${JSON.stringify(
          {name: 'test', otherKey: '2.0.0-beta.1', description: 'test'},
          null,
          DEFAULT_JSON_SPACES,
        )}\n`,
      },
    },
  ] satisfies TestInput[])('should replace version in json with file $name', ({input, output}: TestInput) => {
    const result = replaceVersionInJson(input, createTestContext());

    expect(result).toEqual(output);
  });
});
