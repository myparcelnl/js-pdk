import {
  ComponentImportFunction,
  InstanceContextKey,
  PdkInstanceContext,
  PdkRenderComponent,
} from '@myparcel/pdk-frontend-shared';
import {Plugin, createApp} from 'vue';
import {FinalPdkConfiguration} from './config/types';
import {INJECT_PDK_INSTANCE} from '../data/injections';
// import SettingsFormItem from '../views/module-settings/SettingsFormItem.vue';
import {addVueQuery} from './createVueQuery';
import {createStore} from './plugins/createStore';
import {getElementContext} from './config/getElementContext';
import {logSuccess} from '../services/logging';
import {merge} from 'lodash-unified';
import {registerComponentsPlugin} from './plugins/registerComponentsPlugin';
import {useContextStore} from '../stores';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<PdkRenderComponent, ComponentImportFunction>>({
  LoadingPage: async () => import('../views/loading-page/index.vue'),
  Modals: async () => import('../views/modals/index.vue'),
  ModuleSettings: async () => import('../views/module-settings/index.vue'),
  Notifications: async () => import('../views/notifications/index.vue'),
  OrderCard: async () => import('../views/order-card/index.vue'),
  OrderListColumn: async () => import('../views/order-list-column/index.vue'),
});

export class LocalPdkFrontend {
  private readonly componentName: PdkRenderComponent;
  private readonly elementId: string;
  private readonly localConfig: FinalPdkConfiguration;

  constructor(config: FinalPdkConfiguration, componentName: PdkRenderComponent, elementId: string) {
    this.localConfig = config;
    this.componentName = componentName;
    this.elementId = elementId;

    const newContext = getElementContext(elementId);

    this.localConfig.context = merge({}, this.localConfig.context, newContext);
  }

  public async renderComponent() {
    const component = (await renderMap[this.componentName]()).default;

    const app = createApp(component);

    app.use(addVueQuery);
    app.use(createStore(this.localConfig));
    app.use(this.provideContext());
    app.use(registerComponentsPlugin(this.localConfig.components));

    // app.use((instance) => {
    //   instance.component('SettingsFormItem', SettingsFormItem);
    // });

    this.localConfig?.onCreated?.(this.localConfig);
    app.mount(`#${this.elementId}`);
    logSuccess('Rendered', this.componentName, 'in', this.elementId, this.localConfig.context);
  }

  private provideContext(): Plugin {
    return (instance) => {
      const contextStore = useContextStore();

      contextStore.addContext(this.localConfig.context);

      let context: PdkInstanceContext = {};

      if (this.localConfig.context.orderData?.length) {
        const [order] = this.localConfig.context.orderData;

        context = {
          [InstanceContextKey.ORDER_IDENTIFIER]: order.externalIdentifier,
        };
      }

      instance.provide('id', this.componentName + '_' + this.elementId);
      instance.provide(INJECT_PDK_INSTANCE, {
        component: this.componentName,
        context,
      });
    };
  }
}
