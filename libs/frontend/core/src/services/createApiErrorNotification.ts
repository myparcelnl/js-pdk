import {PdkNotification} from '../types';
import {PdkVariant} from '@myparcel-pdk/common/src';
import {useLanguage} from '../composables';

const PREFIX = 'notification_';

export const createApiErrorNotification = (
  variant: PdkVariant,
  options?: Partial<PdkNotification> & {identifier?: string},
): PdkNotification => {
  const language = useLanguage();
  const {identifier, ...rest} = options ?? {};

  const contentKey = `${PREFIX}${identifier}_${variant}_body`;

  const notification: PdkNotification = {
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
