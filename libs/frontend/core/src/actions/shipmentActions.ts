import {createMutationExecutor, executeAction} from './executors';
import {EndpointName} from '@myparcel-pdk/common';
import {FrontendAction} from './consts';
import {PdkIcon} from '../types';
import {defineAction} from './defineAction';
import {waitForLabelPrompt} from './print';

export const shipmentsCreateReturnAction = defineAction({
  name: FrontendAction.SHIPMENTS_CREATE_RETURN,
  icon: PdkIcon.RETURN,
  label: 'action_create_return_label',
  handler: createMutationExecutor(EndpointName.CREATE_RETURN_SHIPMENTS),
});

/**
 * Fetch shipments from the MyParcel API.
 */
export const shipmentsFetchAction = defineAction({
  name: FrontendAction.SHIPMENTS_FETCH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createMutationExecutor(EndpointName.FETCH_SHIPMENTS),
});

export const shipmentsDeleteAction = defineAction({
  name: FrontendAction.SHIPMENTS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  handler: createMutationExecutor(EndpointName.DELETE_SHIPMENTS),
});

/**
 * Print specific shipments.
 */
export const shipmentsPrintAction = defineAction({
  name: FrontendAction.SHIPMENTS_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
  beforeHandle: waitForLabelPrompt,
  handler: createMutationExecutor(EndpointName.PRINT_SHIPMENTS),
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
