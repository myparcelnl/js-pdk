import {type MaybeActionResponse} from '../../types/actions/response.types';
import {type MaybeAdminAction} from '../../types/actions/actions.types';
import {type ActionContext} from './types';

const AFTER_HANDLE = 'afterHandle';

export async function executeAfterHandle<A extends MaybeAdminAction>(
  context: ActionContext<A>,
  response: MaybeActionResponse<A>,
): Promise<MaybeActionResponse<A>> {
  const {action, instance} = context;

  try {
    // @ts-expect-error todo
    const resolvedResponse = (await action.afterHandle?.({...context, response})) ?? response;

    instance.logger.debug(AFTER_HANDLE, {response, resolvedResponse});

    // @ts-expect-error todo
    return resolvedResponse;
  } catch (error) {
    instance.logger.error(AFTER_HANDLE, error);
  }
}
