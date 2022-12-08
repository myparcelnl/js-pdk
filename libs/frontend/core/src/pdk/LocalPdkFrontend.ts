import {ComponentImportFunction, PdkViewComponent, logger} from '@myparcel-pdk/frontend-shared';
import {createContextPlugin, createRegisterComponentsPlugin, createStorePlugin} from './instance';
import {FinalPdkConfiguration} from '../types';
import {createApp} from 'vue';
import {createVueQueryPlugin} from './createVueQueryPlugin';
import {getElementContext} from '../services';
import {merge} from 'lodash-unified';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<PdkViewComponent, ComponentImportFunction>>({
  /* eslint-disable @typescript-eslint/naming-convention,require-await */
  LoadingPage: async () => import('../views/LoadingPage.vue'),
  Modals: async () => import('../views/Modals.vue'),
  ModuleSettings: async () => import('../views/ModuleSettings.vue'),
  Notifications: async () => import('../views/Notifications.vue'),
  OrderCard: async () => import('../views/OrderCard.vue'),
  OrderListColumn: async () => import('../views/OrderListColumn.vue'),
  /* eslint-enable @typescript-eslint/naming-convention,require-await */
});

export class LocalPdkFrontend {
  private readonly componentName: PdkViewComponent;
  private readonly selector: string;
  private readonly localConfig: FinalPdkConfiguration;

  public constructor(config: FinalPdkConfiguration, componentName: PdkViewComponent, selector: string) {
    this.localConfig = config;
    this.componentName = componentName;
    this.selector = selector;

    const newContext = getElementContext(selector);

    this.localConfig.context = merge({}, this.localConfig.context, newContext);
    logger.debug(`Initialized local PDK frontend for ${componentName} in ${selector}`);
  }

  public async renderComponent(): Promise<void> {
    const component = (await renderMap[this.componentName]()).default;
    const app = createApp({
      ...component,
      name: this.createAppName(),
    });

    app.use(createStorePlugin(this.localConfig));
    app.use(createContextPlugin(this.localConfig, this.selector, this.componentName));
    app.use(createVueQueryPlugin(this.localConfig));
    app.use(createRegisterComponentsPlugin(this.localConfig.components));

    this.localConfig?.onCreated?.(this.localConfig);

    try {
      app.mount(this.selector);
      logger.debug(`Rendered ${this.componentName} in ${this.selector}`, this.localConfig.context);
    } catch (e) {
      logger.error('Error mounting app', e);
    }
  }

  private createAppName(): string {
    const {orderData} = this.localConfig.context;

    let appName = this.componentName;

    const orderId = orderData?.length === 1 ? orderData[0].externalIdentifier : null;

    if (orderId) {
      appName += ` #${orderId}`;
    }

    return appName;
  }
}
