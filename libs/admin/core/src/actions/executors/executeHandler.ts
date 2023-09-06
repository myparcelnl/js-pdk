import {type ActionResponse, type MaybeAdminAction, NotificationCategory} from '../../types';
import {useNotificationStore} from '../../stores';
import {type ActionContext} from './types';

const HANDLER = 'handler';

export async function executeHandler<A extends MaybeAdminAction>(
  context: ActionContext<A>,
): Promise<ActionResponse<A> | undefined> {
  const {action, notifications, instance} = context;
  const store = useNotificationStore();

  store.remove(NotificationCategory.Action);

  try {
    // @ts-expect-error todo
    const response = await action.handler(context);

    instance.logger.debug(HANDLER, {response});

    if (notifications?.success) {
      store.add({...notifications.success, timeout: true}, context.parameters);
    }

    return response as ActionResponse<A>;
  } catch (error) {
    if (notifications?.error && error instanceof Error) {
      store.add({...notifications.error, timeout: false, content: error.message}, context.parameters);
    }

    instance.logger.error(HANDLER, error);
  }
}
