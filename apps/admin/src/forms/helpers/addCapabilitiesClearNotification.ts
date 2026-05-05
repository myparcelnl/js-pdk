import {Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../../types';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';

export const CAPABILITIES_CLEARED_NOTIFICATION_ID = 'capabilities_cleared';

const TITLE_KEY = 'capabilities_cleared_title';

export type CapabilitiesClearEntry = {
  /** Translation key (or already-localized string) describing the cleared field. */
  field: string;
  /** Translation key (or already-localized string) describing why it was cleared. */
  reason: string;
};

/**
 * Add (or replace) the rolling "capabilities cleared" notification in the modal slot.
 *
 * The notification store skips `add` when an entry with the same id is already present, so
 * we explicitly remove the prior one first to surface the new content list. Pass `entries`
 * containing every clear in the current batch — the helper builds one notification with the
 * list as its `content`.
 */
export const addCapabilitiesClearNotification = (entries: CapabilitiesClearEntry[]): void => {
  if (entries.length === 0) return;

  const notificationStore = useNotificationStore();

  notificationStore.remove(CAPABILITIES_CLEARED_NOTIFICATION_ID);

  notificationStore.add({
    id: CAPABILITIES_CLEARED_NOTIFICATION_ID,
    variant: Variant.Warning,
    title: TITLE_KEY,
    content: entries.map((entry) => `${entry.field}: ${entry.reason}`),
    category: NotificationCategory.Modal,
    timeout: false,
  } as PdkNotification);
};
