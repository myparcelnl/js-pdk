import {FrontendAction, PdkAction, PdkIcon} from '../types';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
} from './orderActions';
import {shipmentsCreateReturnAction, shipmentsFetchAction, shipmentsPrintAction} from './shipmentActions';
import {EndpointName} from '@myparcel-pdk/common';
import {createMutationExecutor} from './executors';
import {defineAction} from './defineAction';
import {useModalStore} from '../stores';

export const modalCancelAction = defineAction({
  id: 'cancel',
  label: 'action_cancel',
  handler() {
    const modalStore = useModalStore();
    modalStore.close();
  },
});

export const pluginSettingsUpdateAction = defineAction({
  name: FrontendAction.PLUGIN_SETTINGS_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
  handler: createMutationExecutor(EndpointName.UPDATE_PLUGIN_SETTINGS),
});

export const webhooksCreateAction = defineAction({
  name: FrontendAction.WEBHOOKS_CREATE,
  icon: PdkIcon.ADD,
  label: 'action_create',
  handler: createMutationExecutor(EndpointName.CREATE_WEBHOOKS),
});

export const webhooksDeleteAction = defineAction({
  name: FrontendAction.WEBHOOKS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  handler: createMutationExecutor(EndpointName.DELETE_WEBHOOKS),
});

export const webhooksRefreshAction = defineAction({
  name: FrontendAction.WEBHOOKS_REFRESH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createMutationExecutor(EndpointName.REFRESH_WEBHOOKS),
});

export const frontendActions: PdkAction<FrontendAction>[] = [
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  ordersUpdateAction,
  pluginSettingsUpdateAction,
  shipmentsCreateReturnAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
  webhooksCreateAction,
  webhooksDeleteAction,
  webhooksRefreshAction,
];
