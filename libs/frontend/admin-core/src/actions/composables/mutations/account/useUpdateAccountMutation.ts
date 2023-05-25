/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint, Variant} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {ApiException} from '@myparcel/sdk';
import {usePdkMutation} from '../orders';
import {formToBody} from '../../../../utils';
import {NotificationCategory} from '../../../../types';
import {useNotificationStore} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  const defaultMutationOptions = queryClient.defaultMutationOptions();

  return usePdkMutation(
    BackendEndpoint.UpdateAccount,
    async ({form}) => {
      const pdk = usePdkAdminApi();

      return pdk.updateAccount({
        // @ts-expect-error custom endpoints are not typed correctly
        body: formToBody(form),
      });
    },
    {
      ...defaultMutationOptions,

      onError: (error, variables, context) => {
        if (!isOfType<ApiException>(error, 'data')) {
          defaultMutationOptions.onError?.(error, variables, context);
        }

        const notificationStore = useNotificationStore();
        const translation = 'error_invalid_api_key';

        notificationStore.add({
          category: NotificationCategory.Api,
          content: `${translation}_content`,
          title: translation,
          timeout: false,
          variant: Variant.Error,
        });
      },
    },
  );
};
