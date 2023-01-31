import {FrontendAction, PdkIcon} from '../../types';
import {createMutator, createQueryFetcher} from '../executors';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';

/**
 * Retrieve account.
 */
export const fetchAccountAction = defineAction({
  name: FrontendAction.ACCOUNT_FETCH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createQueryFetcher(EndpointName.FETCH_ACCOUNT),
});

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: FrontendAction.ACCOUNT_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
  handler: createMutator(EndpointName.UPDATE_ACCOUNT),
});
