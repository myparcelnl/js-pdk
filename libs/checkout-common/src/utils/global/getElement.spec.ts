import {afterEach, describe, expect, it, vi} from 'vitest';
import {getElement} from './getElement';

describe('getElement', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return null if the element is not found', () => {
    expect(getElement('#foo', false)).toBeNull();
  });

  it('should return the element if it is found', () => {
    document.body.innerHTML = `
      <div id="foo"></div>
    `;

    expect(getElement('#foo')).toEqual(document.querySelector('#foo'));
  });

  it('should warn if the element is not found', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    getElement('#foo', true);

    expect(consoleWarnSpy).toHaveBeenCalledWith('Element not found: "#foo"');
  });
});
