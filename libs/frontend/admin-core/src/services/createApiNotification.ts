import {type Variant} from '@myparcel-pdk/common';
import {type Notification} from '../types';
import {useLanguage} from '../composables';

const PREFIX = 'notification_';

export const createApiNotification = (
  variant: Variant,
  options?: Partial<Notification> & {identifier?: string},
): undefined | Notification => {
  const language = useLanguage();
  const {identifier, ...rest} = options ?? {};

  const notification: Notification = {timeout: true, ...rest, variant};

  if (options?.content || options?.title) {
    return notification;
  }

  const title = `${PREFIX}${identifier}_${variant}`;
  const contentKey = `${title}_body`;

  const content = language.has(contentKey) ? language.translate(contentKey) : undefined;

  if (!language.has(title) && !content) {
    return undefined;
  }

  return {...notification, title, content};
};
