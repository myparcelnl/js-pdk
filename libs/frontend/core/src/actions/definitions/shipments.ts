import {FrontendAction, PdkIcon} from '../../types';
import {createMutator, executeAction} from '../executors';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';
import {waitForLabelPrompt} from '../print';

export const shipmentsCreateReturnAction = defineAction({
  name: FrontendAction.SHIPMENTS_CREATE_RETURN,
  icon: PdkIcon.RETURN,
  label: 'action_create_return_label',
  handler: createMutator(EndpointName.CREATE_RETURN_SHIPMENTS),
});

/**
 * Fetch shipments from the MyParcel API.
 */
export const shipmentsFetchAction = defineAction({
  name: FrontendAction.SHIPMENTS_FETCH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createMutator(EndpointName.FETCH_SHIPMENTS),
});

/**
 * Delete shipments.
 */
export const shipmentsDeleteAction = defineAction({
  name: FrontendAction.SHIPMENTS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  handler: createMutator(EndpointName.DELETE_SHIPMENTS),
});

/**
 * Print specific shipments.
 */
export const shipmentsPrintAction = defineAction({
  name: FrontendAction.SHIPMENTS_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
  beforeHandle: waitForLabelPrompt,
  handler: createMutator(EndpointName.PRINT_SHIPMENTS),
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
