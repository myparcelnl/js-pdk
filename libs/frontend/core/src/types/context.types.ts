/* eslint-disable @typescript-eslint/naming-convention */

import {AbstractRequest, EndpointName, ModuleSettingsFormItem, Pdk} from '@myparcel-pdk/common';
import {Replace, RequireOnly} from '@myparcel/ts-utils';

export enum InstanceContextKey {
  /**
   * Special.
   */
  ORDER_IDENTIFIER = 'orderIdentifier',
}

export enum ContextKey {
  GLOBAL = 'global',
  ORDER_DATA = 'orderData',

  /** @deprecated */
  MODULE_SETTINGS_VALUES = 'moduleSettingsValues',

  /** @deprecated */
  RETURNS_FORM = 'returnsForm',
}

export type PdkContext<T> = T extends ContextKey.GLOBAL
  ? BaseContext<Replace<Pdk.PluginModelContextGlobalContext, 'endpoints', Record<EndpointName, AbstractRequest>>>
  : T extends ContextKey.ORDER_DATA
  ? BaseContext<Pdk.PluginOrderDataContextCollection>
  : T extends InstanceContextKey.ORDER_IDENTIFIER
  ? BaseContext<Pdk.PluginModelContextOrderDataContext['externalIdentifier']>
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

export type PdkContextObject = {
  [key in ContextKey | InstanceContextKey]: PdkContext<key>;
};

export type FinalPdkContextObject = RequireOnly<Partial<PdkContextObject>, ContextKey.GLOBAL>;
