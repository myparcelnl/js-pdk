import {FinalPdkConfiguration} from './config/types';
import {LocalPdkFrontend} from './localPdkFrontend';
import {PdkRenderComponent} from '@myparcel/pdk-frontend-shared';

export class GlobalPdkFrontend {
  // noinspection TypeScriptFieldCanBeMadeReadonly
  protected _config: FinalPdkConfiguration;

  public get config(): FinalPdkConfiguration {
    return this._config;
  }

  constructor(config: FinalPdkConfiguration) {
    this._config = config;
  }

  // noinspection JSUnusedGlobalSymbols
  public async render(component: PdkRenderComponent, selector: string) {
    const clonedConfig: FinalPdkConfiguration = {...this._config};

    return new LocalPdkFrontend(clonedConfig, component, selector).renderComponent();
  }
}
