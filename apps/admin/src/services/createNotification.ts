import {type Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../types';
import {NotificationCategory} from '../data';
import {useLanguage} from '../composables';

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

  const titleKey = `${PREFIX}${identifier ?? options?.category ?? NotificationCategory.General}_${variant}`;
  const contentKey = `${titleKey}_body`;

  const content = language.has(contentKey) ? language.translate(contentKey) : undefined;

  if (!language.has(titleKey) && !content) {
    return undefined;
  }

  // No notification component translates the title, so resolve it here instead of handing them a
  // translation key to render verbatim.
  const title = language.has(titleKey) ? language.translate(titleKey) : undefined;

  return {...notification, title, content};
};
