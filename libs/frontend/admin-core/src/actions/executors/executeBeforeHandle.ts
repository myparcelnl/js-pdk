import {StopActionHandler} from '../stopActionHandler';
import {ActionParameters, MaybeActionParameters, MaybeAdminAction} from '../../types';
import {ActionContext} from './types';

const BEFORE_HANDLE = 'beforeHandle';

export async function executeBeforeHandle<A extends MaybeAdminAction>(
  context: ActionContext<A>,
): Promise<MaybeActionParameters<A>> {
  const {action, instance, parameters} = context;

  try {
    // @ts-expect-error todo
    const resolvedParameters = (await action.beforeHandle?.(context)) ?? parameters;

    instance.logger.debug(BEFORE_HANDLE, {parameters, resolvedParameters});

    context.parameters = resolvedParameters;
  } catch (error) {
    if (error instanceof StopActionHandler) {
      return;
    }

    instance.logger.error(BEFORE_HANDLE, error);
  }

  return context.parameters as ActionParameters<A>;
}
