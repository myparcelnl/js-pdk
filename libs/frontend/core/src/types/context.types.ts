/* eslint-disable @typescript-eslint/naming-convention */
import {EndpointName, Plugin} from '@myparcel-pdk/common/src';
import {ModalKey} from './modal.types';
import {Replace} from '@myparcel/ts-utils';

export type PdkContextObject = Replace<Plugin.ModelContextContextBag, 'global', GlobalContext> &
  Partial<PdkInstanceContext>;

type GlobalContext = Replace<
  Plugin.ModelContextGlobalContext,
  'endpoints',
  Record<EndpointName, Plugin.AbstractEndpointRequest>
>;

export type AnyContext = PdkContext<ContextKey>;

export type PdkContext<T> = T extends keyof PdkContextObject ? PdkContextObject[T] : never;

export type PdkInstanceContext = {
  [InstanceContextKey.ORDER_IDENTIFIER]: Plugin.ModelContextOrderDataContext['externalIdentifier'];
};

export type PdkModalContext<T extends ModalKey = ModalKey> = T extends ModalKey.SHIPMENT_OPTIONS ? string : never;

export enum ContextKey {
  GLOBAL = 'global',
  DYNAMIC = 'dynamic',
  ORDER_DATA = 'orderData',
  PLUGIN_SETTINGS_VIEW = 'pluginSettingsView',
  PRODUCT_SETTINGS_VIEW = 'productSettingsView',

  INSTANCE = 'instance',
}

export enum InstanceContextKey {
  ORDER_IDENTIFIER = 'orderIdentifier',
}
