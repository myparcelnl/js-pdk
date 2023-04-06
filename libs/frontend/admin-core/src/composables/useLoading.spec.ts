import {describe, expect, it} from 'vitest';
import {useLoading} from './useLoading';

describe('useLoading', () => {
  it('can be toggled', () => {
    const {loading, setLoading} = useLoading();

    expect(loading.value).toBe(false);
    setLoading(true);
    expect(loading.value).toBe(true);
  });

  it('uses the initial value', () => {
    const {loading, setLoading} = useLoading(true);

    expect(loading.value).toBe(true);
    setLoading(false);
    expect(loading.value).toBe(false);
  });
});
