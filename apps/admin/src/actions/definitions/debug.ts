import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {downloadBlob} from '../../utils/downloadBlob';
import {AdminAction, AdminIcon} from '../../data';

/**
 * Download zip with logs.
 */
export const downloadLogsAction = defineAction({
  name: AdminAction.DownloadLogs,
  icon: AdminIcon.Download,
  label: 'action_download_logs',
  handler: createMutationHandler(BackendEndpoint.DownloadLogs),
  // @ts-expect-error todo
  afterHandle(response) {
    downloadBlob(response.response, 'logs.zip');
  },
});

/**
 * Switch to acceptance API.
 */
export const switchToAcceptanceApiAction = defineAction({
  name: AdminAction.SwitchToAcceptanceApi,
  icon: AdminIcon.Refresh,
  label: 'action_switch_to_acceptance_api',
  handler: createMutationHandler(BackendEndpoint.SwitchToAcceptanceApi),
});

/**
 * Switch to production API.
 */
export const switchToProductionApiAction = defineAction({
  name: AdminAction.SwitchToProductionApi,
  icon: AdminIcon.Refresh,
  label: 'action_switch_to_production_api',
  handler: createMutationHandler(BackendEndpoint.SwitchToProductionApi),
});
