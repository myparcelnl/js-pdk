import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useDownloadLogsMutation = (): ResolvedQuery<BackendEndpoint.DownloadLogs> => {
  return usePdkMutation(BackendEndpoint.DownloadLogs, () => usePdkAdminApi().downloadLogs());
};
