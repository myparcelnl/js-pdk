import {Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../../types';
import {type useNotificationStore} from '../../stores';
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
 * Add (or replace) the rolling "capabilities cleared" notification.
 *
 * The notification store skips `add` when an entry with the same id is already present, so
 * we explicitly remove the prior one first to surface the new content list. Pass every clear
 * in the current batch via `entries` — the helper builds one notification with the list as
 * its `content`. Caller passes `notificationStore` captured at composable setup so the call
 * site doesn't depend on Vue setup context.
 */
export const addCapabilitiesClearNotification = (
  notificationStore: ReturnType<typeof useNotificationStore>,
  entries: CapabilitiesClearEntry[],
): void => {
  if (entries.length === 0) return;

  notificationStore.remove(CAPABILITIES_CLEARED_NOTIFICATION_ID);

  notificationStore.add({
    id: CAPABILITIES_CLEARED_NOTIFICATION_ID,
    variant: Variant.Warning,
    title: TITLE_KEY,
    content: entries.map((entry) => `${entry.field}: ${entry.reason}`),
    // The shipment-options modal mounts <NotificationContainer category="Action" /> — that's
    // the slot users will see this notification in. `NotificationCategory.Modal` exists but
    // isn't rendered by this form's modal.
    category: NotificationCategory.Action,
    timeout: false,
  } as PdkNotification);
};
