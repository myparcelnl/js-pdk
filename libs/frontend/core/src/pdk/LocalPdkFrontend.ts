import {
  ComponentImportFunction,
  PdkRenderComponent,
  logDebug,
  logError,
  logSuccess,
} from '@myparcel-pdk/frontend-shared';
import {createContextPlugin, createRegisterComponentsPlugin, createStorePlugin, createVueQueryPlugin} from './instance';
import {FinalPdkConfiguration} from '../types';
import {createApp} from 'vue';
import {getElementContext} from '../services';
import {merge} from 'lodash-unified';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<PdkRenderComponent, ComponentImportFunction>>({
  /* eslint-disable @typescript-eslint/naming-convention,require-await */
  LoadingPage: async () => import('../views/loading-page/index.vue'),
  Modals: async () => import('../views/modals/index.vue'),
  ModuleSettings: async () => import('../views/module-settings/index.vue'),
  Notifications: async () => import('../views/notifications/index.vue'),
  OrderCard: async () => import('../views/order-card/index.vue'),
  OrderListColumn: async () => import('../views/order-list-column/index.vue'),
  /* eslint-enable @typescript-eslint/naming-convention,require-await */
});

export class LocalPdkFrontend {
  private readonly componentName: PdkRenderComponent;
  private readonly selector: string;
  private readonly localConfig: FinalPdkConfiguration;

  public constructor(config: FinalPdkConfiguration, componentName: PdkRenderComponent, selector: string) {
    this.localConfig = config;
    this.componentName = componentName;
    this.selector = selector;

    const newContext = getElementContext(selector);

    this.localConfig.context = merge({}, this.localConfig.context, newContext);
    logDebug(`Initialized local PDK frontend for ${componentName} in ${selector}`);
  }

  public async renderComponent(): Promise<void> {
    const component = (await renderMap[this.componentName]()).default;
    const app = createApp(component);

    app.use(createStorePlugin(this.localConfig));
    app.use(createContextPlugin(this.localConfig, this.selector, this.componentName));
    app.use(createRegisterComponentsPlugin(this.localConfig.components));
    app.use(createVueQueryPlugin());

    this.localConfig?.onCreated?.(this.localConfig);

    try {
      console.log(component.name, app);
      app.mount(this.selector);
      logSuccess(`Rendered ${this.componentName} in ${this.selector}`, this.localConfig.context);
    } catch (e) {
      logError('Error mounting app:');
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
