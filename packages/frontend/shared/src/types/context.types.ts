/* eslint-disable @typescript-eslint/naming-convention */

import {AbstractRequest, EndpointName} from './myparcel.types';
import {ModuleSettingsFormItem} from './boop.types';
import {MyParcelPdk} from './php-pdk.types';
import {PdkContextObject} from './pdk.types';
import {Replace} from './utils.types';

export enum InstanceContextKey {
  /**
   * Special.
   */
  ORDER_IDENTIFIER = 'orderIdentifier',
}

export enum ContextKey {
  GLOBAL = 'global',
  ORDER_DATA = 'orderData',
  PLUGIN_SETTINGS = 'pluginSettings',

  /** @deprecated */
  MODULE_SETTINGS_VALUES = 'moduleSettingsValues',

  /** @deprecated */
  RETURNS_FORM = 'returnsForm',
}

export type PdkContext<T> = T extends ContextKey.GLOBAL
  ? BaseContext<Replace<MyParcelPdk.GlobalContext, 'endpoints', Record<EndpointName, AbstractRequest>>>
  : T extends ContextKey.ORDER_DATA
  ? BaseContext<MyParcelPdk.OrderDataContextCollection>
  : T extends InstanceContextKey.ORDER_IDENTIFIER
  ? BaseContext<MyParcelPdk.OrderDataContext['externalIdentifier']>
  : T extends ContextKey.PLUGIN_SETTINGS
  ? BaseContext<MyParcelPdk.PluginSettingsContext>
  : never;

export type BaseContext<C = Record<never, never>> = C;

export type AnyContext = PdkContext<ContextKey>;

export type PdkInstanceContext = Partial<Pick<PdkContextObject, InstanceContextKey>>;

interface ModuleSettingsTab {
  children: ModuleSettingsFormItem[];
  label: string;
  name: string;
}

export type ModuleSettingsFormContext = ModuleSettingsTab[];

export type ModuleSettingsValuesContext = Record<string, string | boolean | string[]>;
