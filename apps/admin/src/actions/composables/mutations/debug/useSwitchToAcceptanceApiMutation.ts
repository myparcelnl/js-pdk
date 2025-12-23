import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useSwitchToAcceptanceApiMutation = (): ResolvedQuery<BackendEndpoint.SwitchToAcceptanceApi> => {
  return usePdkMutation(BackendEndpoint.SwitchToAcceptanceApi, () =>
    (usePdkAdminApi() as {switchToAcceptanceApi: () => Promise<void>}).switchToAcceptanceApi(),
  );
};
