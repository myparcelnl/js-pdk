/* eslint-disable @typescript-eslint/naming-convention */

import {Replace, RequireOnly} from '@myparcel/ts-utils';
import {ModalKey} from '../';
import {Plugin} from '@myparcel-pdk/common';

export enum InstanceContextKey {
  ORDER_IDENTIFIER = 'orderIdentifier',
}

export enum ContextKey {
  GLOBAL = 'global',
  ORDER_DATA = 'orderData',
}

export type GlobalContext = Replace<
  Plugin.ModelContextGlobalContext,
  'endpoints',
  Record<string, Plugin.AbstractEndpointRequest>
>;

export type PdkContext<T> = T extends ContextKey.GLOBAL
  ? GlobalContext
  : T extends ContextKey.ORDER_DATA
  ? Plugin.OrderDataContextCollection
  : T extends InstanceContextKey.ORDER_IDENTIFIER
  ? Plugin.ModelContextOrderDataContext['externalIdentifier']
  : null;

export type PdkModalContext<T extends ModalKey = ModalKey> = T extends ModalKey.SHIPMENT_OPTIONS ? string : never;

export type BaseContext = Record<never, never>;

export type AnyContext = PdkContext<ContextKey>;

export type PdkInstanceContext = Partial<Pick<PdkContextObject, InstanceContextKey>>;

export type PdkContextObject = {
  [k in ContextKey | InstanceContextKey]: PdkContext<k>;
};

export type FinalPdkContextObject = RequireOnly<Partial<PdkContextObject>, ContextKey.GLOBAL>;
