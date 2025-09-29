import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useSwitchToProductionApiMutation = (): ResolvedQuery<BackendEndpoint.SwitchToProductionApi> => {
  return usePdkMutation(BackendEndpoint.SwitchToProductionApi, () =>
    (usePdkAdminApi() as {switchToProductionApi: () => Promise<void>}).switchToProductionApi(),
  );
};
