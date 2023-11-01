import {describe, expect, it} from 'vitest';
import {getElementContext} from '../services';

describe('get element context', () => {
  it('gets context from an element', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'a-div-with-context');
    div.setAttribute('data-pdk-context', '{"json":"content"}');

    document.body.appendChild(div);

    expect(getElementContext('#a-div-with-context')).toEqual({json: 'content'});
  });

  it('returns empty object for element that does not exist', () => {
    expect(getElementContext('#does-not-exist')).toEqual({});
  });
});
