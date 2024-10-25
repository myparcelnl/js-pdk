import {type Variant} from '@myparcel-pdk/common';
import {type PdkNotification} from '../types/common.types';
import {NotificationCategory} from '../data/constants';
import {useLanguage} from '../composables/language/useLanguage';

const PREFIX = 'notification_';

export const createNotification = (
  variant: Variant,
  options?: Partial<PdkNotification> & {identifier?: string},
): undefined | PdkNotification => {
  const language = useLanguage();
  const {identifier, ...rest} = options ?? {};

  const notification: PdkNotification = {
    timeout: true,
    variant,
    ...rest,
  };

  if (options?.content || options?.title) {
    return notification;
  }

  const title = `${PREFIX}${identifier ?? options?.category ?? NotificationCategory.General}_${variant}`;
  const contentKey = `${title}_body`;

  const content = language.has(contentKey) ? language.translate(contentKey) : undefined;

  if (!language.has(title) && !content) {
    return undefined;
  }

  return {...notification, title, content};
};
