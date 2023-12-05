import {describe, expect, it} from 'vitest';
import * as testing from '../testing';
import * as index from '../index';

describe('exports', () => {
  it('exports from index.ts', () => {
    expect(Object.keys(index).sort()).toMatchSnapshot();
  });

  it('exports from testing.ts', () => {
    expect(Object.keys(testing).sort()).toMatchSnapshot();
  });
});
