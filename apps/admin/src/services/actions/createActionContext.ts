import {Variant} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {createLogger} from '../logger';
import {createNotification} from '../createNotification';
import {type PdkNotification} from '../../types/common.types';
import {type AdminInstance} from '../../types/admin.types';
import {type AnyActionDefinition} from '../../types/actions.types';
import {type ActionParameters} from '../../types/actions/parameters.types';
import {type MaybeAdminAction} from '../../types/actions/actions.types';
import {NotificationCategory} from '../../data/constants';
import {useAdminInstance} from '../../composables/useAdminInstance';
import {type ActionContext} from '../../actions/executors/types';
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
          tags: {
            action: identifier,
          },
        }),
      }),
      {} as Record<Variant, PdkNotification>,
    ),
  };
};
