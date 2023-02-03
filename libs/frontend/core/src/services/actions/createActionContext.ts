import {ActionParameters, AdminAction, PdkAction, PdkNotification} from '../../types';
import {ActionContext} from '../../actions';
import {PdkAppInstance} from '../../data';
import {PdkVariant} from '@myparcel-pdk/common';
import {createApiErrorNotification} from '../createApiErrorNotification';
import {createLogger} from '../logger';
import {getActionIdentifier} from './getActionIdentifier';
import {usePdkInstance} from '../../composables';

const VARIANTS = [PdkVariant.SUCCESS, PdkVariant.ERROR];

export const createActionContext = <A extends AdminAction | undefined>(
  action: PdkAction<A>,
  parameters?: ActionParameters<A>,
  existingInstance?: PdkAppInstance,
): ActionContext<A> => {
  const identifier = getActionIdentifier(action);
  const logger = createLogger(identifier);

  // @ts-expect-error todo
  const context: ActionContext<A> = {
    action,

    parameters: parameters ?? {},

    instance: {
      ...(existingInstance ?? usePdkInstance()),
      logger,
    },

    notifications: VARIANTS.reduce(
      (acc, type) => ({
        ...acc,
        [type]: createApiErrorNotification(type, {
          identifier: `action_${identifier}`,
        }),
      }),
      {} as Record<'success' | 'error', PdkNotification>,
    ),
  };

  return context;
};
