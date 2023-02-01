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
import {PdkAppConfig} from '../data';
import {PdkViewComponent} from '@myparcel-pdk/common';
import {renderViewComponent} from './renderMap';
import {testIdDirective} from './testIdDirective';

export class PdkFrontend {
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
  public async render(view: PdkViewComponent, selector: string): Promise<void> {
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

  protected async createApp(view: PdkViewComponent, appConfig: PdkAppConfig): Promise<App> {
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
  protected createAppName(componentName: PdkViewComponent, context: PdkContextObject): string {
    if (process.env.NODE_ENV === 'production') {
      return componentName;
    }

    const {orderData} = context;

    let appName = componentName;

    if (componentName === 'OrderListColumn') {
      const orderId = orderData?.length === 1 ? orderData[0].externalIdentifier : null;

      appName += ` #${orderId}`;
    }

    return appName;
  }
}
