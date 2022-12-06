import {FinalPdkConfiguration, InstanceContextKey, PdkInstanceContext} from '../../types';
import {INJECT_PDK_INSTANCE} from '../../data';
import {Plugin} from 'vue';
import {useContextStore} from '../../stores';

export const createContextPlugin = (
  config: FinalPdkConfiguration,
  elementId: string,
  componentName: string,
): Plugin => ({
  install(app) {
    const contextStore = useContextStore();

    contextStore.addContext(config.context);

    let context: PdkInstanceContext = {};

    if (config.context.orderData?.length) {
      const [order] = config.context.orderData;

      context = {
        [InstanceContextKey.ORDER_IDENTIFIER]: order.externalIdentifier,
      };
    }

    app.provide('id', `${componentName}_${elementId}`);
    app.provide(INJECT_PDK_INSTANCE, {
      component: componentName,
      context,
      config,
    });
  },
});
