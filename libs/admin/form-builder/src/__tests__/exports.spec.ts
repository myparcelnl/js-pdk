import {describe, expect, it} from 'vitest';
import * as index from '../index';

describe('exports', () => {
  it('exports from index.ts', () => {
    expect(Object.keys(index)).toMatchSnapshot();
  });
});
