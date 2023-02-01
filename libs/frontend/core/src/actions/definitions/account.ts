import {FrontendAction, PdkIcon} from '../../types';
import {createMutator, createQueryFetcher, executeNextAction} from '../executors';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';

/**
 * Retrieve context.
 */
export const fetchContextAction = defineAction({
  name: FrontendAction.CONTEXT_FETCH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createQueryFetcher(EndpointName.FETCH_CONTEXT),
});

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: FrontendAction.ACCOUNT_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
  handler: createMutator(EndpointName.UPDATE_ACCOUNT),
  async afterHandle(context) {
    await executeNextAction(context, fetchContextAction);

    return context.response;
  },
});
