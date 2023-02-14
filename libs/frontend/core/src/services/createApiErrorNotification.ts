import {Notification} from '../types';
import {Variant} from '@myparcel-pdk/common/src';
import {useLanguage} from '../composables';

const PREFIX = 'notification_';

export const createApiErrorNotification = (
  variant: Variant,
  options?: Partial<Notification> & {identifier?: string},
): Notification => {
  const language = useLanguage();
  const {identifier, ...rest} = options ?? {};

  const contentKey = `${PREFIX}${identifier}_${variant}_body`;

  const notification: Notification = {
    ...rest,
    variant,
    timeout: true,
  };

  if (options?.content || options?.title) {
    return notification;
  }

  return {
    ...notification,
    title: `${PREFIX}${variant}`,
    content: language.has(contentKey) ? language.translate(contentKey) : undefined,
  };
};
