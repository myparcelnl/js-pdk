/* eslint-disable @typescript-eslint/naming-convention */
import {PdkViewComponent, logger} from '@myparcel-pdk/frontend-shared';
import {FinalPdkConfiguration} from '../types';
import {LocalPdkFrontend} from './LocalPdkFrontend';

export class GlobalPdkFrontend {
  // noinspection TypeScriptFieldCanBeMadeReadonly
  protected _config: FinalPdkConfiguration;

  public get config(): FinalPdkConfiguration {
    return this._config;
  }

  public constructor(config: FinalPdkConfiguration) {
    this._config = config;
  }

  // noinspection JSUnusedGlobalSymbols
  public async render(component: PdkViewComponent, selector: string): Promise<void> {
    logger.debug(`Rendering "${component}" in "${selector}"`);
    const clonedConfig: FinalPdkConfiguration = {...this._config};

    const localPdkFrontend = new LocalPdkFrontend(clonedConfig, component, selector);

    return localPdkFrontend.renderComponent();
  }
}
