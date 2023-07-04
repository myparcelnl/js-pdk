import {createNotification} from '@myparcel-pdk/frontend-admin-core';
import {Variant} from '@myparcel-pdk/common';
import {createLogger} from '../logger';
import {
  type ActionParameters,
  type AnyAdminAction,
  type MaybeAdminAction,
  type Notification,
  NotificationCategory,
} from '../../types';
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

    notifications: [Variant.Error, Variant.Success].reduce(
      (acc, variant) => ({
        ...acc,
        [variant]: createNotification(variant, {
          category: NotificationCategory.Action,
          tags: {
            action: identifier,
          },
        }),
      }),
      {} as Record<Variant, Notification>,
    ),
  };
};
