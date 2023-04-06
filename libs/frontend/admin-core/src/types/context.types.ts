/* eslint-disable @typescript-eslint/naming-convention */
import {BackendPdkEndpointObject, Plugin} from '@myparcel-pdk/common/src';
import {OneOrMore, Replace} from '@myparcel/ts-utils';
import {AdminModalKey} from './modal.types';
import {FormInstance} from '@myparcel/vue-form-builder/src';

export type AdminContextObject = Replace<Plugin.ModelContextContextBag, 'global', GlobalAdminContext> &
  Partial<AdminInstanceContext>;

type GlobalAdminContext = Replace<Plugin.ModelContextGlobalContext, 'endpoints', BackendPdkEndpointObject>;

export type AnyAdminContext = AdminContext<AdminContextKey>;

export type AdminContext<T> = T extends keyof AdminContextObject ? AdminContextObject[T] : never;

export type AdminInstanceContext = {
  [AdminInstanceContextKey.OrderIdentifier]: Plugin.ModelContextOrderDataContext['externalIdentifier'];
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
  ProductSettingsView = 'productSettingsView',

  Instance = 'instance',
}

export enum AdminInstanceContextKey {
  OrderIdentifier = 'orderIdentifier',
}