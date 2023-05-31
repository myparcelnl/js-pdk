import {Variant} from '@myparcel-pdk/common';
import {createLogger} from '../logger';
import {createApiNotification} from '../createApiNotification';
import {type ActionParameters, type AnyAdminAction, type MaybeAdminAction, type Notification} from '../../types';
import {type AdminInstance} from '../../data';
import {useAdminInstance} from '../../composables';
import {type ActionContext} from '../../actions';
import {getActionIdentifier} from './getActionIdentifier';

type CreateActionContext = <A extends MaybeAdminAction>(
  action: AnyAdminAction<A>,
  parameters?: ActionParameters<A>,
  existingInstance?: AdminInstance,
) => ActionContext<A>;

export const createActionContext: CreateActionContext = (action, parameters, existingInstance) => {
  const identifier = getActionIdentifier(action);
  const logger = createLogger(identifier);

  return {
    action,

    parameters: parameters ?? {},

    instance: {
      ...(existingInstance ?? useAdminInstance()),
      logger,
    },

    notifications: Object.values(Variant).reduce((acc, type) => {
      const notification = createApiNotification(type, {identifier: `action_${identifier}`});

      if (!notification) {
        return acc;
      }

      return {...acc, [type]: notification};
    }, {} as Record<Variant, Notification>),
  };
};
