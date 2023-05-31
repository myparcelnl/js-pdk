import {BackendEndpoint, Variant} from '@myparcel-pdk/common';
import {openOrPrintPdf, resolvePrintParameters} from '../print';
import {createMutationHandler, executeNextAction} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../types';

export const shipmentsExportReturnAction = defineAction({
  name: AdminAction.ShipmentsExportReturn,
  icon: AdminIcon.Return,
  label: 'action_export_return',
  handler: createMutationHandler(BackendEndpoint.ExportReturn),
});

/**
 * Fetch shipments from the MyParcel Api.
 */
export const shipmentsUpdateAction = defineAction({
  name: AdminAction.ShipmentsUpdate,
  icon: AdminIcon.Refresh,
  label: 'action_refresh',
  handler: createMutationHandler(BackendEndpoint.UpdateShipments),
});

/**
 * Delete shipments.
 */
export const shipmentsDeleteAction = defineAction({
  name: AdminAction.ShipmentsDelete,
  icon: AdminIcon.Delete,
  label: 'action_delete',
  handler: createMutationHandler(BackendEndpoint.DeleteShipments),
  variant: Variant.Error,
});

/**
 * Print specific shipments.
 */
export const shipmentsPrintAction = defineAction({
  name: AdminAction.ShipmentsPrint,
  icon: AdminIcon.Print,
  label: 'action_print',
  beforeHandle: resolvePrintParameters,
  handler: createMutationHandler(BackendEndpoint.PrintShipments),
  async afterHandle(context) {
    await openOrPrintPdf(context);

    void executeNextAction(context, shipmentsUpdateAction, {
      orderIds: context.parameters?.orderIds as string,
      shipmentIds: context.parameters?.shipmentIds as number,
    });

    return context.response;
  },
});

export const shipmentActions = [
  shipmentsPrintAction,
  shipmentsUpdateAction,
  shipmentsExportReturnAction,
  shipmentsDeleteAction,
];
