/* eslint-disable @typescript-eslint/naming-convention */
import {EndpointName, ModalKey} from '../';
import {Replace, RequireOnly} from '@myparcel/ts-utils';
import {Plugin} from '@myparcel-pdk/common';

export type AnyContext = PdkContext<ContextKey>;

export type FinalPdkContextObject = RequireOnly<Partial<PdkContextObject>, ContextKey.GLOBAL>;

export type GlobalContext = Replace<
  Plugin.ModelContextGlobalContext,
  'endpoints',
  Record<EndpointName, Plugin.AbstractEndpointRequest>
>;

export type PdkContext<T> = T extends ContextKey.GLOBAL
  ? GlobalContext
  : T extends ContextKey.ORDER_DATA
  ? Plugin.OrderDataContextCollection
  : T extends InstanceContextKey.ORDER_IDENTIFIER
  ? Plugin.ModelContextOrderDataContext['externalIdentifier']
  : null;

export type PdkContextObject = {
  [k in ContextKey | InstanceContextKey]: PdkContext<k>;
};

export type PdkInstanceContext = Partial<Pick<PdkContextObject, InstanceContextKey>>;

export type PdkModalContext<T extends ModalKey = ModalKey> = T extends ModalKey.SHIPMENT_OPTIONS ? string : never;

export enum ContextKey {
  GLOBAL = 'global',
  ORDER_DATA = 'orderData',
}

export enum InstanceContextKey {
  ORDER_IDENTIFIER = 'orderIdentifier',
}
