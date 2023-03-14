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
  const store = useNotificationStore();
  let response;

  try {
    // @ts-expect-error todo
    const resolvedParameters = (await context.action.beforeHandle?.(context)) ?? context.parameters;

    context.instance?.logger?.debug({parameters: context.parameters, resolvedParameters});

    context.parameters = resolvedParameters;
  } catch (error) {
    if (error instanceof StopActionHandler) {
      return;
    }

    context.instance?.logger.error(error);
  }

  try {
    // @ts-expect-error todo
    response = await context.action.handler(context);

    if (context.notifications?.success) {
      store.add(context.notifications.success);
    }
  } catch (error) {
    if (context.notifications?.error) {
      store.add(context.notifications.error);
    }

    context.instance?.logger.error(error);
  }

  // @ts-expect-error todo
  const resolvedResponse = (await context.action.afterHandle?.({...context, response})) ?? response;

  context.instance?.logger?.debug({response, resolvedResponse});

  // @ts-expect-error todo
  return resolvedResponse;
};
