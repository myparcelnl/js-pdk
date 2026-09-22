import {type Raw} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {type OneOrMore, type Replace} from '@myparcel-dev/ts-utils';
import {type AdminContextKey, type Plugin} from '@myparcel-dev/pdk-common';
import {type AdminInstanceContextKey, type AdminModalKey} from '../data';
import {type BackendPdkEndpointObject} from './endpoints.types';

export type AdminContextObject = Replace<Plugin.ModelContextContextBag, 'global', GlobalAdminContext> &
  Partial<AdminInstanceContext>;

export type GlobalAdminContext = Replace<Plugin.ModelContextGlobalContext, 'endpoints', BackendPdkEndpointObject>;

export type AnyAdminContext = AdminContext<AdminContextKey>;

export type AdminContext<T> = T extends keyof AdminContextObject ? AdminContextObject[T] : never;

export type AdminInstanceContext = {
  [AdminInstanceContextKey.OrderIdentifier]: Plugin.ModelContextOrderDataContext['externalIdentifier'];
  [AdminInstanceContextKey.ProductIdentifier]: Plugin.ModelContextProductDataContext['externalIdentifier'];
};

// The form is stored with markRaw, so Vue leaves its refs alone at runtime. Raw says that in
// the type too, which keeps the store's deep ref-unwrapping off it.
type BaseModalContext = {form?: Raw<FormInstance>};

export type AdminModalContext<T extends AdminModalKey = AdminModalKey> =
  | (BaseModalContext & (T extends AdminModalKey.ShipmentOptions ? {orderIds?: OneOrMore<string>} : unknown))
  | null;
