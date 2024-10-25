import {describe, expect, it} from 'vitest';
import {ADMIN_COMPONENT_PREFIX} from '../data/constants';
import {AdminComponent} from '../data/components';
import {prefixComponent} from './prefixComponent';

describe('prefixComponent', () => {
  it('should prefix the component name', () => {
    expect(prefixComponent(AdminComponent.Box)).toBe(`${ADMIN_COMPONENT_PREFIX}${AdminComponent.Box}`);
  });

  it('should not prefix the component name if it is already prefixed', () => {
    expect(prefixComponent(`${ADMIN_COMPONENT_PREFIX}${AdminComponent.Box}`)).toBe(
      `${ADMIN_COMPONENT_PREFIX}${AdminComponent.Box}`,
    );
  });
});
