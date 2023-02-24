import {ActionParameters, AdminAction, AnyAdminAction, Notification} from '../../types';
import {ActionContext} from '../../actions';
import {AdminInstance} from '../../data';
import {Variant} from '@myparcel-pdk/common/src';
import {createApiNotification} from '../createApiNotification';
import {createLogger} from '../logger';
import {getActionIdentifier} from './getActionIdentifier';
import {useAdminInstance} from '../../composables';

const VARIANTS = [Variant.SUCCESS, Variant.ERROR];

export const createActionContext = <A extends AdminAction | undefined>(
  action: AnyAdminAction<A>,
  parameters?: ActionParameters<A>,
  existingInstance?: AdminInstance,
): ActionContext<A> => {
  const identifier = getActionIdentifier(action);
  const logger = createLogger(identifier);

  // @ts-expect-error todo
  return {
    action,

    parameters: parameters ?? {},

    instance: {
      ...(existingInstance ?? useAdminInstance()),
      logger,
    },

    notifications: VARIANTS.reduce((acc, type) => {
      const notification = createApiNotification(type, {identifier: `action_${identifier}`});

      if (!notification) {
        return acc;
      }

      return {...acc, [type]: notification};
    }, {} as Record<'success' | 'error', Notification>),
  };
};
