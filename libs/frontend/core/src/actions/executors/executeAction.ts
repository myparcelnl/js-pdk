import {ActionResponse, AdminAction} from '../../types';
import {ActionContext} from './types';
import {StopActionHandler} from '../stopActionHandler';
import {useNotificationStore} from '../../stores';

/**
 * Execute a PdkAction.
 */
export const executeAction = async <A extends AdminAction | undefined>(
  context: ActionContext<A>,
): Promise<ActionResponse<A> | undefined> => {
  const {action, notifications, instance, parameters} = context;

  const store = useNotificationStore();
  let response;

  try {
    // @ts-expect-error todo
    const resolvedParameters = (await action.beforeHandle?.(context)) ?? parameters;

    instance?.logger?.debug({parameters, resolvedParameters});

    context.parameters = resolvedParameters;
  } catch (error) {
    if (error instanceof StopActionHandler) {
      return;
    }

    instance?.logger.error(error);
  }

  try {
    // @ts-expect-error todo
    response = await action.handler(context);

    if (notifications?.success) {
      store.add(notifications.success);
    }
  } catch (error) {
    if (error instanceof StopActionHandler) {
      return;
    }

    if (notifications?.error) {
      store.add(notifications.error);
    }

    instance?.logger.error(error);
  }

  try {
    // @ts-expect-error todo
    const resolvedResponse = (await action.afterHandle?.({...context, response})) ?? response;

    instance?.logger?.debug({response, resolvedResponse});

    // @ts-expect-error todo
    return resolvedResponse;
  } catch (error) {
    if (error instanceof StopActionHandler) {
      return;
    }

    instance?.logger.error(error);
  }
};
