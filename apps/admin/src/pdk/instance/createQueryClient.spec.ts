// @vitest-environment happy-dom

import {describe, expect, it} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useNotificationStore} from '../../stores';
import {NotificationSource} from '../../data';
import {createQueryClient} from './createQueryClient';

describe('createQueryClient', () => {
  it('clears the api notifications of its own store, not of the active one', () => {
    const ownStore = createPinia();
    const otherStore = createPinia();
    const queryClient = createQueryClient(ownStore);

    setActivePinia(otherStore);
    useNotificationStore(ownStore).add({content: 'own', tags: {source: NotificationSource.Api}} as never);
    useNotificationStore(otherStore).add({content: 'other', tags: {source: NotificationSource.Api}} as never);

    queryClient.getDefaultOptions().mutations?.onMutate?.(undefined);

    expect(useNotificationStore(ownStore).notifications).toHaveLength(0);
    expect(useNotificationStore(otherStore).notifications).toHaveLength(1);
  });
});
