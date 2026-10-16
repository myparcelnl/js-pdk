// @vitest-environment happy-dom

import {afterEach, describe, expect, it, vi} from 'vitest';
import {createPdkAdmin} from './createPdkAdmin';

const PING = 'test_pdk_ping';
const PONG = 'test_pdk_pong';

const addBootElement = () => {
  const element = document.createElement('span');

  element.id = 'myparcel-pdk-boot';
  element.dataset.pdkContext = JSON.stringify({global: {eventPing: PING, eventPong: PONG, mode: 'production'}});
  document.body.append(element);
};

describe('createPdkAdmin', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('answers a ping with its instance until it is disposed', () => {
    addBootElement();
    const pong = vi.fn();
    document.addEventListener(PONG, pong);

    const pdkAdmin = createPdkAdmin({components: {}} as never);
    pong.mockClear();

    document.dispatchEvent(new Event(PING));
    expect(pong).toHaveBeenCalledTimes(1);

    pdkAdmin?.dispose();
    document.dispatchEvent(new Event(PING));
    expect(pong).toHaveBeenCalledTimes(1);

    document.removeEventListener(PONG, pong);
  });

  it('can be disposed twice', () => {
    addBootElement();
    const pdkAdmin = createPdkAdmin({components: {}} as never);

    pdkAdmin?.dispose();

    expect(() => pdkAdmin?.dispose()).not.toThrow();
  });

  it('stops answering pings when a pong handler disposes it right away', () => {
    addBootElement();
    const disposeOnPong = (event: Event) => (event as CustomEvent).detail.dispose();
    document.addEventListener(PONG, disposeOnPong, {once: true});

    createPdkAdmin({components: {}} as never);

    const pong = vi.fn();
    document.addEventListener(PONG, pong);
    document.dispatchEvent(new Event(PING));

    expect(pong).not.toHaveBeenCalled();

    document.removeEventListener(PONG, pong);
  });
});
