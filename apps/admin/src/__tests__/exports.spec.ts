import {describe, expect, it} from 'vitest';
import * as integrated from '../integrated';
import * as index from '../index';

describe('exports', () => {
  it('exports from index.ts', () => {
    expect(Object.keys(index)).toMatchSnapshot();
  });

  it('exports from integrated.ts', () => {
    expect(Object.keys(integrated)).toMatchSnapshot();
  });
});
