import {type ActionResponse, type MaybeAdminAction} from '../../types';
import {useNotificationStore} from '../../stores';
import {type ActionContext} from './types';

const HANDLER = 'handler';

export async function executeHandler<A extends MaybeAdminAction>(
  context: ActionContext<A>,
): Promise<ActionResponse<A> | undefined> {
  const {action, notifications, instance} = context;
  const store = useNotificationStore();

  try {
    // @ts-expect-error todo
    const response = await action.handler(context);

    instance.logger.debug(HANDLER, {response});

    if (notifications?.success) {
      store.add(notifications.success);
    }

    return response as ActionResponse<A>;
  } catch (error) {
    if (notifications?.error) {
      store.add(notifications.error);
    }

    instance.logger.error(HANDLER, error);
  }
}
