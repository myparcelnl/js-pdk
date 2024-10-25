import * as testIndex from './index';
import {describe, expect, it} from 'vitest';
import * as index from '../index';

describe('exports', () => {
  it('exports from index.ts', () => {
    expect(Object.keys(index).sort()).toMatchSnapshot();
  });

  it('exports from __tests__/index.ts', () => {
    expect(Object.keys(testIndex).sort()).toMatchSnapshot();
  });
});
