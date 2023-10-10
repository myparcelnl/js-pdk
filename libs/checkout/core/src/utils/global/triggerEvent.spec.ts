import {afterEach, describe, expect, it, vi} from 'vitest';
import {triggerEvent} from './triggerEvent';

describe('triggerEvent', () => {
  const documentDispatchEventSpy = vi.spyOn(document, 'dispatchEvent');

  afterEach(() => {
    documentDispatchEventSpy.mockClear();
  });

  it('dispatches an event on the document', () => {
    triggerEvent('foo');
    expect(documentDispatchEventSpy).toHaveBeenCalled();
  });

  it('dispatches an event on the document with a detail', () => {
    triggerEvent('foo', {bar: 'baz'});
    expect(documentDispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
  });

  it('dispatches an event on a given element', () => {
    const element = document.createElement('div');

    element.dispatchEvent = vi.fn();

    triggerEvent('foo', null, element);
    expect(element.dispatchEvent).toHaveBeenCalled();
  });
});
