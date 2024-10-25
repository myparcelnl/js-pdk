import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';

export const useDownloadLogsMutation = (): ResolvedQuery<BackendEndpoint.DownloadLogs> => {
  return usePdkMutation(BackendEndpoint.DownloadLogs, () => usePdkAdminApi().downloadLogs());
};
