/* eslint-disable @typescript-eslint/naming-convention */
import {App, createApp} from 'vue';
import {PdkConfiguration, PdkContextObject} from '../types';
import {
  createContextPlugin,
  createLoggerPlugin,
  createRegisterComponentsPlugin,
  createStorePlugin,
  createVueQueryPlugin,
} from './instance';
import {createLogger, getElementContext} from '../services';
import {PdkAdminComponent} from '@myparcel-pdk/common';
import {PdkAppConfig} from '../data';
import {renderViewComponent} from './renderMap';
import {testIdDirective} from './testIdDirective';

export class PdkAdmin {
  public readonly config: PdkConfiguration;
  public readonly context: PdkContextObject;

  public readonly renderedComponents: string[] = [];

  public constructor(config: PdkConfiguration, context: PdkContextObject) {
    this.config = config;
    this.context = context;
  }

  /**
   * Render a views in given selector.
   */
  public async render(view: PdkAdminComponent, selector: string): Promise<void> {
    const config: PdkConfiguration = {...this.config};
    const context: PdkContextObject = {...this.context, ...getElementContext(selector)};

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

  protected async createApp(view: PdkAdminComponent, appConfig: PdkAppConfig): Promise<App> {
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
  protected createAppName(componentName: PdkAdminComponent, context: PdkContextObject): string {
    if (process.env.NODE_ENV === 'production') {
      return componentName;
    }

    const {orderData} = context;

    let appName: string = componentName;

    if (componentName === PdkAdminComponent.ORDER_LIST_COLUMN) {
      const orderId = orderData?.length === 1 ? orderData[0].externalIdentifier : null;

      appName += ` #${orderId}`;
    }

    return appName;
  }
}
