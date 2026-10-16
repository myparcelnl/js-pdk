// @vitest-environment happy-dom

import {describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useNotificationStore} from '../stores';
import {PdkFetchClient} from './PdkFetchClient';

const notification = {category: 'api', content: 'From the first admin', variant: 'success'};

const createClient = (response: Promise<unknown>): PdkFetchClient => {
  const client = new PdkFetchClient({baseUrl: 'https://shop.test'});

  vi.spyOn(client as never, 'normalizeOptions').mockReturnValue({} as never);
  vi.spyOn(client as never, 'validateHeaders').mockReturnValue(undefined as never);
  Object.assign(client, {request: vi.fn(() => response)});

  return client;
};

describe('PdkFetchClient', () => {
  it('adds the notifications of a late response to the store that was active when the request started', async () => {
    const firstStore = createPinia();
    const secondStore = createPinia();
    let respond: (value: unknown) => void = () => undefined;
    const client = createClient(
      new Promise((resolve) => {
        respond = resolve;
      }),
    );

    setActivePinia(firstStore);
    const request = client.doRequest({getResponseProperty: () => 'items'} as never, {} as never);

    // A new admin instance mounts while the request is underway.
    setActivePinia(secondStore);
    respond({data: {items: [], notifications: [notification]}});
    await request;

    expect(useNotificationStore(firstStore).notifications).toHaveLength(1);
    expect(useNotificationStore(secondStore).notifications).toHaveLength(0);
  });
});
