import {Variant} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {createLogger} from '../logger';
import {createNotification} from '../createNotification';
import {
  type ActionParameters,
  type AdminInstance,
  type AnyActionDefinition,
  type MaybeAdminAction,
  type PdkNotification,
} from '../../types';
import {NotificationCategory} from '../../data';
import {useAdminInstance} from '../../composables';
import {type ActionContext} from '../../actions';
import {getActionIdentifier} from './getActionIdentifier';

export const createActionContext = <A extends MaybeAdminAction>(
  action: AnyActionDefinition<A>,
  parameters?: ActionParameters<A>,
  existingInstance?: AdminInstance,
): ActionContext<A> => {
  const identifier = getActionIdentifier(action);
  const logger = createLogger(identifier);

  return {
    // @ts-expect-error todo
    action,

    // @ts-expect-error todo
    parameters: parameters ?? {},

    instance: {
      ...(existingInstance ?? useAdminInstance()),
      logger,
    },

    notifications: toArray(action.notifications ?? [Variant.Error]).reduce(
      (acc, variant) => ({
        ...acc,
        [variant]: createNotification(variant, {
          category: NotificationCategory.General,
          tags: {
            action: identifier,
          },
        }),
      }),
      {} as Record<Variant, PdkNotification>,
    ),
  };
};
