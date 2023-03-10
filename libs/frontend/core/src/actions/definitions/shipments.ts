import {AdminAction, AdminIcon} from '../../types';
import {createMutator, executeAction} from '../executors';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';
import {waitForLabelPrompt} from '../print';

export const shipmentsCreateReturnAction = defineAction({
  name: AdminAction.ShipmentsCreateReturn,
  icon: AdminIcon.Return,
  label: 'action_create_return_label',
  handler: createMutator(BackendEndpoint.CreateReturnShipments),
});

/**
 * Fetch shipments from the MyParcel Api.
 */
export const shipmentsFetchAction = defineAction({
  name: AdminAction.ShipmentsFetch,
  icon: AdminIcon.Refresh,
  label: 'action_refresh',
  handler: createMutator(BackendEndpoint.FetchShipments),
});

/**
 * Delete shipments.
 */
export const shipmentsDeleteAction = defineAction({
  name: AdminAction.ShipmentsDelete,
  icon: AdminIcon.Delete,
  label: 'action_delete',
  handler: createMutator(BackendEndpoint.DeleteShipments),
});

/**
 * Print specific shipments.
 */
export const shipmentsPrintAction = defineAction({
  name: AdminAction.ShipmentsPrint,
  icon: AdminIcon.Print,
  label: 'action_print',
  beforeHandle: waitForLabelPrompt,
  handler: createMutator(BackendEndpoint.PrintShipments),
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
