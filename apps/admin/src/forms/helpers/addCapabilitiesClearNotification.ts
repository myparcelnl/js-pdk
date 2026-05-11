import {Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../../types';
import {useModalStore, type useNotificationStore} from '../../stores';
import {AdminModalKey, NotificationCategory} from '../../data';

export const CAPABILITIES_CLEARED_NOTIFICATION_ID = 'capabilities_cleared';

/**
 * Add (or replace) the rolling "capabilities cleared" notification.
 *
 * The notification store skips `add` when an entry with the same id is already present, so
 * we explicitly remove the prior one first to surface the new content list. Pass an
 * already-localized `title` and `lines` — translation happens at the call site (auto-clear)
 * because that's the layer holding the carrier name + axis context for parameterized lookups.
 *
 * Targets `NotificationCategory.Modal` when the shipment-options modal is open and
 * `NotificationCategory.Action` otherwise — the modal shells (preset packages) only mount a
 * `Modal` container, while the order-detail `ShipmentOptionsBox` mounts an `Action` container.
 */
export const addCapabilitiesClearNotification = (
  notificationStore: ReturnType<typeof useNotificationStore>,
  title: string,
  lines: string[],
): void => {
  if (lines.length === 0) return;

  const isModal = AdminModalKey.ShipmentOptions === useModalStore().opened;

  notificationStore.remove(CAPABILITIES_CLEARED_NOTIFICATION_ID);

  notificationStore.add({
    id: CAPABILITIES_CLEARED_NOTIFICATION_ID,
    variant: Variant.Warning,
    title,
    content: lines,
    category: isModal ? NotificationCategory.Modal : NotificationCategory.Action,
    timeout: false,
  } as PdkNotification);
};
