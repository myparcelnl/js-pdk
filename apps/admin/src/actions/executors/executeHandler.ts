import {ApiException} from '@myparcel-dev/sdk';
import {type ActionResponse, type MaybeAdminAction} from '../../types';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';
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
    // The backend reports a failure through the notifications in its error response, which
    // PdkFetchClient adds to the store. Only fall back to a generic message when the response
    // carried none, for example because the request never reached the backend.
    const reported =
      error instanceof ApiException && Boolean((error.data as {notifications?: unknown[]}).notifications?.length);

    if (!reported && notifications?.error && error instanceof Error) {
      store.add({...notifications.error, timeout: false, content: error.message}, context.parameters);
    }

    instance.logger.error(HANDLER, error);
  }
}
