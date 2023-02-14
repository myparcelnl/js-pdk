/* eslint-disable @typescript-eslint/naming-convention */
import {AdminConfiguration, AdminContextObject} from '../types';
import {App, createApp} from 'vue';
import {
  createContextPlugin,
  createLoggerPlugin,
  createRegisterComponentsPlugin,
  createStorePlugin,
  createVueQueryPlugin,
} from './instance';
import {createLogger, getElementContext} from '../services';
import {AdminAppConfig} from '../data';
import {AdminView} from '@myparcel-pdk/common/src';
import {renderViewComponent} from './renderMap';
import {testIdDirective} from './testIdDirective';

export class PdkAdmin {
  public readonly config: AdminConfiguration;
  public readonly context: AdminContextObject;

  public readonly renderedComponents: string[] = [];

  public constructor(config: AdminConfiguration, context: AdminContextObject) {
    this.config = config;
    this.context = context;
  }

  /**
   * Render a views in given selector.
   */
  public async render(view: AdminView, selector: string): Promise<void> {
    const config: AdminConfiguration = {...this.config};
    const context: AdminContextObject = {...this.context, ...getElementContext(selector)};

    const appName = this.createAppName(view, context);
    const logger = createLogger(appName);

    logger.debug(`Rendering "${view}" in "${selector}"`);

    const app = await this.createApp(view, {appName, logger, config, context});

    app.directive('test', testIdDirective);

    try {
      app.mount(selector);
      this.renderedComponents.push(view);
      logger.debug(`Rendered in ${selector}`);
    } catch (e) {
      logger.error('Error mounting app', e);
    }
  }

  protected async createApp(view: AdminView, appConfig: AdminAppConfig): Promise<App> {
    appConfig.config?.beforeCreate?.(appConfig.config);

    const component = await renderViewComponent(view);
    const app = createApp({...component, name: appConfig.appName});

    app.use(createStorePlugin(appConfig));
    app.use(createVueQueryPlugin(appConfig));
    app.use(createContextPlugin(appConfig));
    app.use(createRegisterComponentsPlugin(appConfig));
    app.use(createLoggerPlugin(appConfig));

    appConfig.config?.onCreated?.(appConfig.config);

    return app;
  }

  /**
   * Create a unique app name for components that are rendered multiple times.
   */
  protected createAppName(componentName: AdminView, context: AdminContextObject): string {
    if (process.env.NODE_ENV === 'production') {
      return componentName;
    }

    const {orderData} = context;

    let appName: string = componentName;

    if (componentName === AdminView.ORDER_LIST_COLUMN) {
      const orderId = orderData?.length === 1 ? orderData[0].externalIdentifier : null;

      appName += ` #${orderId}`;
    }

    return appName;
  }
}
