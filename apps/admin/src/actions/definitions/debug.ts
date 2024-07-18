import {Variant} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';
import {useNotificationStore} from '../../stores';
import {usePdkAdminApi} from '../../sdk';
import {AdminAction, AdminIcon, NotificationCategory} from '../../data';

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

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

    // const subject = 'Logs downloaded';
    // const body = 'Logs downloaded from the admin panel';
    // const url = 'mailto:edie+test@myparcel.nl';
    //
    // const params = {
    //   subject,
    //   body,
    //   attachment: 'logs.zip',
    // };
    //
    // const resolvedUrl = Object.entries(params).reduce((acc, [key, value]) => {
    //   return `${acc}${key}=${encodeURIComponent(value)}&`;
    // }, `${url}?`);
    //
    // console.log(resolvedUrl);
    // openUrl(resolvedUrl);
  },
});

export const debugSendLogsAction = defineAction({
  name: AdminAction.DebugSendLogs,
  icon: AdminIcon.External,
  label: 'action_download',
  async handler() {
    const api = usePdkAdminApi();

    return api.debugSendLogs();
  },

  afterHandle() {
    const notifications = useNotificationStore();

    notifications.add({
      variant: Variant.Success,
      category: NotificationCategory.General,
      title: 'Logs sent',
      content: 'Logs have been sent to the support team',
    });
  },
});
