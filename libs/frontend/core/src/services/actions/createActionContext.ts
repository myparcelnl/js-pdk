import {ActionParameters, FrontendAction, PdkAction, PdkNotification} from '../../types';
import {useLanguage, usePdkInstance} from '../../composables';
import {ActionContext} from '../../actions';
import {PdkAppInstance} from '../../data';
import {PdkVariant} from '@myparcel-pdk/common';
import {createLogger} from '../logger';
import {getActionIdentifier} from './getActionIdentifier';

const VARIANTS: PdkVariant[] = ['success', 'error'];

const PREFIX = 'notification_action_';

export const createActionContext = <A extends FrontendAction | undefined>(
  action: PdkAction<A>,
  parameters?: ActionParameters<A>,
  existingInstance?: PdkAppInstance,
): ActionContext<A> => {
  const identifier = getActionIdentifier(action);
  const logger = createLogger(identifier);
  const language = useLanguage();

  // @ts-expect-error todo
  const context: ActionContext<A> = {
    action,

    parameters: parameters ?? {},

    instance: {
      ...(existingInstance ?? usePdkInstance()),
      logger,
    },

    notifications: VARIANTS.reduce((acc, type) => {
      const contentKey = `${PREFIX}${identifier}_${type}_body`;

      return {
        ...acc,
        [type]: {
          variant: type,
          title: `${PREFIX}${type}`,
          content: language.has(contentKey) ? language.translate(contentKey) : undefined,
          timeout: true,
        },
      };
    }, {} as Record<'success' | 'error', PdkNotification>),
  };

  return context;
};
