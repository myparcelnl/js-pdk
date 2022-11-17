/* eslint-disable @typescript-eslint/naming-convention */
import {FinalPdkConfiguration} from '../types';
import {LocalPdkFrontend} from './LocalPdkFrontend';
import {PdkRenderComponent} from '@myparcel-pdk/frontend-shared';

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
  public async render(component: PdkRenderComponent, selector: string): Promise<void> {
    const clonedConfig: FinalPdkConfiguration = {...this._config};

    return new LocalPdkFrontend(clonedConfig, component, selector).renderComponent();
  }
}
