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
  [AdminInstanceContextKey.ORDER_IDENTIFIER]: Plugin.ModelContextOrderDataContext['externalIdentifier'];
};

export type AdminModalContext<T extends AdminModalKey = AdminModalKey> = T extends AdminModalKey.SHIPMENT_OPTIONS
  ? string
  : never;

export enum AdminContextKey {
  GLOBAL = 'global',
  DYNAMIC = 'dynamic',
  ORDER_DATA = 'orderData',
  PLUGIN_SETTINGS_VIEW = 'pluginSettingsView',
  PRODUCT_SETTINGS_VIEW = 'productSettingsView',

  INSTANCE = 'instance',
}

export enum AdminInstanceContextKey {
  ORDER_IDENTIFIER = 'orderIdentifier',
}
