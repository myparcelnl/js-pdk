import {defineAction} from '../defineAction';
import {downloadBlob} from '../../utils';
import {usePdkAdminApi} from '../../sdk';
import {AdminAction, AdminIcon} from '../../data';

export const debugDownloadLogsAction = defineAction({
  name: AdminAction.DebugDownloadLogs,
  icon: AdminIcon.Download,
  label: 'action_download',
  async handler() {
    const api = usePdkAdminApi();

    return api.debugDownloadLogs();
  },

  afterHandle(context) {
    downloadBlob(context.response, 'logs.zip');
  },
});
