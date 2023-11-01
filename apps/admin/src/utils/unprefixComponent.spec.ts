import {describe, expect, it} from 'vitest';
import {AdminComponent} from '../data';
import {unprefixComponent} from './unprefixComponent';

describe('unprefixComponent', () => {
  it('should unprefix a component name', () => {
    expect(unprefixComponent('PdkTriStateInput')).toBe(AdminComponent.TriStateInput);
  });

  it('should do nothing if the component name is not prefixed', () => {
    expect(unprefixComponent('TriStateInput')).toBe('TriStateInput');
  });
});
