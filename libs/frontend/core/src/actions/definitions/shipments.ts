import {AdminAction, AdminIcon} from '../../types';
import {createMutator, executeAction} from '../executors';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';
import {waitForLabelPrompt} from '../print';

export const shipmentsCreateReturnAction = defineAction({
  name: AdminAction.SHIPMENTS_CREATE_RETURN,
  icon: AdminIcon.RETURN,
  label: 'action_create_return_label',
  handler: createMutator(BackendEndpoint.CREATE_RETURN_SHIPMENTS),
});

/**
 * Fetch shipments from the MyParcel API.
 */
export const shipmentsFetchAction = defineAction({
  name: AdminAction.SHIPMENTS_FETCH,
  icon: AdminIcon.REFRESH,
  label: 'action_refresh',
  handler: createMutator(BackendEndpoint.FETCH_SHIPMENTS),
});

/**
 * Delete shipments.
 */
export const shipmentsDeleteAction = defineAction({
  name: AdminAction.SHIPMENTS_DELETE,
  icon: AdminIcon.DELETE,
  label: 'action_delete',
  handler: createMutator(BackendEndpoint.DELETE_SHIPMENTS),
});

/**
 * Print specific shipments.
 */
export const shipmentsPrintAction = defineAction({
  name: AdminAction.SHIPMENTS_PRINT,
  icon: AdminIcon.PRINT,
  label: 'action_print',
  beforeHandle: waitForLabelPrompt,
  handler: createMutator(BackendEndpoint.PRINT_SHIPMENTS),
  afterHandle(context) {
    void executeAction({
      action: shipmentsFetchAction,
      parameters: {
        orderIds: context.parameters?.orderIds,
        shipmentIds: context.parameters?.shipmentIds,
      },
      instance: context.instance,
    });

    return context.response;
  },
});
