// @vitest-environment happy-dom

import {describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useNotificationStore} from '../../stores';
import {hideLabelsNotification, LABELS_NOTIFICATION_ID, showLabelsFailed} from './labelsNotification';

vi.mock('../../composables', () => ({useLanguage: () => ({translate: (key: string) => key})}));

describe('labelsNotification', () => {
  it('shows and hides the notification in the given store, not in the active one', () => {
    const ownStore = createPinia();
    const otherStore = createPinia();
    setActivePinia(otherStore);

    showLabelsFailed(ownStore);

    expect(useNotificationStore(ownStore).notifications.map(({id}) => id)).toEqual([LABELS_NOTIFICATION_ID]);
    expect(useNotificationStore(otherStore).notifications).toHaveLength(0);

    hideLabelsNotification(ownStore);

    expect(useNotificationStore(ownStore).notifications).toHaveLength(0);
  });
});
