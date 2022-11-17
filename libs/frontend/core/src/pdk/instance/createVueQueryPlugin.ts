import {QueryClient, VueQueryPlugin, VueQueryPluginOptions} from '@tanstack/vue-query';
import {Plugin} from 'vue';

let queryClient: QueryClient;

export const createVueQueryPlugin = (): Plugin => {
  return {
    install(app) {
      queryClient ??= new QueryClient();

      const vueQueryPluginOptions: VueQueryPluginOptions = {
        queryClient,
        queryClientConfig: {
          defaultOptions: {
            queries: {
              staleTime: Infinity,
              refetchOnWindowFocus: false,
            },

            mutations: {
              onError(error) {
                console.log(error);

                // if (isOfType<ApiException>(error, 'data')) {
                //   const store = useNotificationStore();
                //
                //   store.add({
                //     variant: 'danger',
                //     title: error.message,
                //     content: error.data.errors.map((error) => `${error.title} (code: ${error.code})`),
                //   });
                // }
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

      app.use(VueQueryPlugin, vueQueryPluginOptions);
    },
  };
};
