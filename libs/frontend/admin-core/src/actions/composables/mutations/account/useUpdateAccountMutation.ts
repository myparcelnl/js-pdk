/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint, Variant} from '@myparcel-pdk/common/src';
import {ApiException} from '@myparcel/sdk';
import {NotificationCategory} from '../../../../types';
import {formToBody} from '../../../../utils';
import {isOfType} from '@myparcel/ts-utils';
import {useNotificationStore} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

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
