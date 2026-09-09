import {type PdkNotification} from '../types';

/**
 * A backend notification is tagged with every order the action ran for, so an order list column
 * matches on that list instead of on the whole tag.
 */
export const notificationBelongsToOrder = (
  notification: Pick<PdkNotification, 'tags'>,
  externalIdentifier?: string,
): boolean => {
  const {orderIds} = notification.tags ?? {};

  if (!orderIds || !externalIdentifier) {
    return false;
  }

  return orderIds.split(',').includes(externalIdentifier);
};
