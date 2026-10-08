/* eslint-disable @typescript-eslint/naming-convention */

import {type App, createApp} from 'vue';
import {type AdminAppConfig, type AdminConfiguration, type AdminContextObject} from '../types';
import {INJECT_GLOBAL_PDK_ADMIN} from '../symbols';
import {createLogger, getElementContext} from '../services';
import {AdminView} from '../data';
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
   * Render a view in the given selector. Returns the app, so the caller can
   * unmount it, or undefined when mounting failed.
   */
  public async render(view: AdminView, selector: string): Promise<App | undefined> {
    const config: AdminConfiguration = {...this.config};
    const context: AdminContextObject = {...this.context, ...getElementContext(selector)};

    const appName = this.createAppName(view, context);
    const logger = createLogger(appName);

    logger.debug(`Rendering "${view}" in "${selector}"`);

    const app = await this.createApp(view, {appName, config, context, logger, view});

    try {
      if (!app.mount(selector)) {
        logger.error(`Element "${selector}" not found`);
        return undefined;
      }

      this.renderedComponents.push(view);
      config?.onRendered?.(config);
      logger.debug(`Rendered in ${selector}`);

      return app;
    } catch (e) {
      logger.error('Error mounting app', e);
      return undefined;
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
