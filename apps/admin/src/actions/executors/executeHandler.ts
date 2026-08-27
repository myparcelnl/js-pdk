import {Variant} from '@myparcel-dev/pdk-common';
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

  const countErrors = () => store.notifications.filter(({variant}) => variant === Variant.Error).length;

  const errorCount = countErrors();

  try {
    // @ts-expect-error todo
    const response = await action.handler(context);

    instance.logger.debug(HANDLER, {response});

    if (notifications?.success) {
      store.add({...notifications.success, timeout: true}, context.parameters);
    }

    return response as ActionResponse<A>;
  } catch (error) {
    // A failing request reports itself through the notifications the backend sends along with the
    // error response. Only fall back to a generic message when it did not, for example because the
    // request never reached the backend.
    const reported = countErrors() > errorCount;

    if (!reported && notifications?.error && error instanceof Error) {
      store.add({...notifications.error, timeout: false, content: error.message}, context.parameters);
    }

    instance.logger.error(HANDLER, error);
  }
}
