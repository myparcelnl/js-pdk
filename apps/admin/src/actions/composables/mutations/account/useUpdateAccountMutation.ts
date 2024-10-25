import {useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey, BackendEndpoint, Variant} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {type ApiException} from '@myparcel/sdk';
import {usePdkMutation} from '../usePdkMutation';
import {formToBody} from '../../../../utils/forms/formToBody';
import {type ActionInput} from '../../../../types/actions/parameters.types';
import {useNotificationStore} from '../../../../stores/useNotificationStore';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';
import {NotificationCategory} from '../../../../data/constants';
import {useLanguage} from '../../../../composables/language/useLanguage';

export const useUpdateAccountMutation = (): ResolvedQuery<BackendEndpoint.UpdateAccount> => {
  const queryClient = useQueryClient();
  const defaultMutationOptions = queryClient.defaultMutationOptions();
  const {translate} = useLanguage();

  return usePdkMutation(
    BackendEndpoint.UpdateAccount,
    async (input) => {
      const pdk = usePdkAdminApi();

      const response = await pdk.updateAccount({body: formToBody(input?.form)});

      return response[0];
    },
    {
      ...defaultMutationOptions,

      onSuccess(data) {
        queryClient.setQueryData(
          [BackendEndpoint.FetchContext, AdminContextKey.Dynamic],
          data[AdminContextKey.Dynamic],
        );

        queryClient.setQueryData(
          [BackendEndpoint.FetchContext, AdminContextKey.PluginSettingsView],
          data[AdminContextKey.PluginSettingsView],
        );
      },

      onError(error, variables: ActionInput<BackendEndpoint.UpdateAccount>, context) {
        if (!isOfType<ApiException>(error, 'data')) {
          defaultMutationOptions.onError?.(error, variables, context);
        }

        const notificationStore = useNotificationStore();
        const translation = 'error_invalid_api_key';

        notificationStore.add({
          category: NotificationCategory.General,
          content: translate(`${translation}_content`),
          title: translate(translation),
          timeout: false,
          variant: Variant.Error,
        });
      },
    },
  );
};
