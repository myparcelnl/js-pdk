/* eslint-disable @typescript-eslint/naming-convention */
import {BackendPdkEndpointObject, Plugin} from '@myparcel-pdk/common/src';
import {AdminModalKey} from './modal.types';
import {Replace} from '@myparcel/ts-utils';

export type AdminContextObject = Replace<Plugin.ModelContextContextBag, 'global', GlobalAdminContext> &
  Partial<AdminInstanceContext>;

type GlobalAdminContext = Replace<Plugin.ModelContextGlobalContext, 'endpoints', BackendPdkEndpointObject>;

export type AnyAdminContext = AdminContext<AdminContextKey>;

export type AdminContext<T> = T extends keyof AdminContextObject ? AdminContextObject[T] : never;

export type AdminInstanceContext = {
  [AdminInstanceContextKey.OrderIdentifier]: Plugin.ModelContextOrderDataContext['externalIdentifier'];
};

export type AdminModalContext<T extends AdminModalKey = AdminModalKey> = T extends AdminModalKey.ShipmentOptions
  ? string
  : never;

export enum AdminContextKey {
  Global = 'global',
  Dynamic = 'dynamic',
  OrderData = 'orderData',
  PluginSettingsView = 'pluginSettingsView',
  ProductSettingsView = 'productSettingsView',

  Instance = 'instance',
}

export enum AdminInstanceContextKey {
  OrderIdentifier = 'orderIdentifier',
}
