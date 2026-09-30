import {describe, expect, it} from 'vitest';
import {encodeArrayParameter} from './encodeArrayParameter';

describe('encodeArrayParameter', () => {
  it('returns a single value unchanged', () => {
    expect(encodeArrayParameter('290')).toBe('290');
  });

  // A raw `;` is rewritten to `&` by some proxies (e.g. Traefik), which drops every id after the first.
  it('joins multiple values with an encoded semicolon', () => {
    expect(encodeArrayParameter(['290', 289, '288'])).toBe('290%3B289%3B288');
  });

  it('skips undefined and null values', () => {
    expect(encodeArrayParameter(['290', undefined, '288'])).toBe('290%3B288');
  });

  it('returns an empty string for no value', () => {
    expect(encodeArrayParameter(undefined)).toBe('');
    expect(encodeArrayParameter(null)).toBe('');
  });

  it('encodes characters that would break the query string', () => {
    expect(encodeArrayParameter(['a&b', 'c#d'])).toBe('a%26b%3Bc%23d');
  });
});
