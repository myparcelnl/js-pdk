/* eslint-disable @typescript-eslint/naming-convention */
import {type BackendPdkEndpointObject, type Plugin} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type OneOrMore, type Replace} from '@myparcel/ts-utils';
import {type AdminModalKey} from './modal.types';

export type AdminContextObject = Replace<Plugin.ModelContextContextBag, 'global', GlobalAdminContext> &
  Partial<AdminInstanceContext>;

export type GlobalAdminContext = Replace<Plugin.ModelContextGlobalContext, 'endpoints', BackendPdkEndpointObject>;

export type AnyAdminContext = AdminContext<AdminContextKey>;

export type AdminContext<T> = T extends keyof AdminContextObject ? AdminContextObject[T] : never;

export type AdminInstanceContext = {
  [AdminInstanceContextKey.OrderIdentifier]: Plugin.ModelContextOrderDataContext['externalIdentifier'];
  [AdminInstanceContextKey.ProductIdentifier]: Plugin.ModelContextProductDataContext['externalIdentifier'];
};

type BaseModalContext = {form?: FormInstance};

export type AdminModalContext<T extends AdminModalKey = AdminModalKey> =
  | (BaseModalContext & (T extends AdminModalKey.ShipmentOptions ? {orderIds?: OneOrMore<string>} : unknown))
  | null;

export enum AdminContextKey {
  Global = 'global',
  Dynamic = 'dynamic',
  OrderData = 'orderData',
  PluginSettingsView = 'pluginSettingsView',
  ProductData = 'productData',
  ProductSettingsView = 'productSettingsView',

  Instance = 'instance',
}

export enum AdminInstanceContextKey {
  OrderIdentifier = 'orderIdentifier',
  ProductIdentifier = 'productIdentifier',
}
