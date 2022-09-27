import {VueQueryPlugin, VueQueryPluginOptions} from 'vue-query';
import {ApiException} from '@myparcel/sdk';
import {App} from 'vue';
import {isOfType} from '@myparcel/pdk-frontend-shared';
import {useNotificationStore} from '../stores';

export const addVueQuery = (instance: App): void => {
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    contextSharing: true,
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchOnWindowFocus: false,
        },

        mutations: {
          onError(error) {
            if (isOfType<ApiException>(error, 'data')) {
              const store = useNotificationStore();

              store.add({
                variant: 'danger',
                title: error.message,
                content: error.data.errors.map((error) => `${error.title} (code: ${error.code})`),
              });
            }
          },

          onSettled(input, error, response) {
            console.log('onSettled', input, error, response);
          },

          onSuccess(input, response) {
            console.log('onSuccess', input, response);
          },

          onMutate(response) {
            console.log('onMutate', response);
          },
        },
      },
    },
  };

  instance.use(VueQueryPlugin, vueQueryPluginOptions);
};
