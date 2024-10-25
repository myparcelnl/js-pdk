import {StopActionHandler} from '../stopActionHandler';
import {type MaybeActionParameters} from '../../types/actions/parameters.types';
import {type MaybeAdminAction} from '../../types/actions/actions.types';
import {type ActionContext} from './types';

const BEFORE_HANDLE = 'beforeHandle';

export async function executeBeforeHandle<A extends MaybeAdminAction>(
  context: ActionContext<A>,
): Promise<MaybeActionParameters<A> | StopActionHandler> {
  const {action, instance, parameters} = context;

  try {
    // @ts-expect-error todo
    const resolvedParameters = (await action.beforeHandle?.(context)) ?? parameters;

    instance.logger.debug(BEFORE_HANDLE, {parameters, resolvedParameters});

    // @ts-expect-error todo
    context.parameters = resolvedParameters;
  } catch (error) {
    if (error instanceof StopActionHandler) {
      return error;
    }

    instance.logger.error(BEFORE_HANDLE, error);
  }

  return context.parameters as MaybeActionParameters<A>;
}
