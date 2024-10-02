import {BackendEndpoint} from '@myparcel-pdk/common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../data';

/**
 * Download zip with logs.
 */
export const downloadLogsAction = defineAction({
  name: AdminAction.DownloadLogs,
  icon: AdminIcon.Download,
  label: 'action_download_logs',
  handler: createMutationHandler(BackendEndpoint.DownloadLogs),
});
