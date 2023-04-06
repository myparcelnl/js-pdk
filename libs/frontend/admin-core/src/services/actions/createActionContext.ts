import {ActionParameters, AnyAdminAction, MaybeAdminAction} from '../../types';
import {ActionContext} from '../../actions';
import {AdminInstance} from '../../data';
import {Variant} from '@myparcel-pdk/common/src';
import {createApiNotification} from '../createApiNotification';
import {createLogger} from '../logger';
import {getActionIdentifier} from './getActionIdentifier';
import {useAdminInstance} from '../../composables';

const VARIANTS = [Variant.Success, Variant.Error] as const;

type CreateActionContext = <A extends MaybeAdminAction>(
  action: AnyAdminAction<A>,
  parameters?: ActionParameters<A>,
  existingInstance?: AdminInstance,
) => ActionContext<A>;

// @ts-expect-error todo
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

    notifications: VARIANTS.reduce((acc, type) => {
      const notification = createApiNotification(type, {identifier: `action_${identifier}`});

      if (!notification) {
        return acc;
      }

      return {...acc, [type]: notification};
    }, {} as Record<keyof typeof VARIANTS, Notification>),
  };
};
