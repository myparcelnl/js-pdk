/* eslint-disable @typescript-eslint/naming-convention */

import {type App, createApp} from 'vue';
import {type AdminAppConfig, type AdminConfiguration, type AdminContextObject} from '../types';
import {createLogger, getElementContext} from '../services';
import {AdminView, INJECT_GLOBAL_PDK_ADMIN} from '../data';
import {setupAdminApp} from './setupAdminApp';
import {renderViewComponent} from './renderMap';

export class PdkAdmin {
  public readonly config: AdminConfiguration;
  public readonly context: AdminContextObject;

  public readonly renderedComponents: string[] = [];

  public constructor(config: AdminConfiguration, context: AdminContextObject) {
    config.beforeInitialize?.(config, context);

    this.config = config;
    this.context = context;

    config.onInitialized?.(config, context);
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

    const app = await this.createApp(view, {appName, config, context, logger, view});

    try {
      app.mount(selector);
      this.renderedComponents.push(view);
      config?.onRendered?.(config);
      logger.debug(`Rendered in ${selector}`);
    } catch (e) {
      logger.error('Error mounting app', e);
    }
  }

  protected async createApp(view: AdminView, appConfig: AdminAppConfig): Promise<App> {
    appConfig.view = view;
    appConfig.config?.beforeRender?.(appConfig.config);

    const component = await renderViewComponent(view);
    const app = createApp({...component, name: appConfig.appName}).provide(INJECT_GLOBAL_PDK_ADMIN, this);

    setupAdminApp(app, appConfig);

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

    if (componentName === AdminView.OrderListItem) {
      const orderId = orderData?.length === 1 ? orderData[0].externalIdentifier : null;

      appName += ` #${orderId}`;
    }

    return appName;
  }
}
