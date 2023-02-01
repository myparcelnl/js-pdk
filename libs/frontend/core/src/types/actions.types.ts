import {ActionContext, ActionContextWithResponse} from '../actions';
import {ActionInput, EndpointResponse, FrontendActionEndpointMap} from './endpoints.types';
import {MaybeRef} from '@vueuse/core';
import {PdkIcon} from './common.types';
import {PdkVariant} from '@myparcel-pdk/common';
import {PromiseOr} from '@myparcel/ts-utils';

export type MaybeFrontendAction = FrontendAction | undefined;

type BaseAction = {
  icon?: PdkIcon;
  label?: string;
  variant?: MaybeRef<PdkVariant>;
  disabled?: MaybeRef<boolean>;
  standalone?: boolean;
};

export type NamedAction<A extends FrontendAction = FrontendAction> = BaseAction & {
  name: A;
  handler(context: ActionContext<A>): PromiseOr<ActionResponse<A>>;
  beforeHandle?(context: ActionContext<A>): PromiseOr<ActionParameters<A>>;
  afterHandle?(context: ActionContextWithResponse<A>): PromiseOr<ActionResponse<A>>;
};

export type GenericAction = BaseAction & {
  id: string;
  handler(context: ActionContext<undefined>): PromiseOr<void>;
  beforeHandle?(context: ActionContext<undefined>): PromiseOr<void>;
  afterHandle?(context: ActionContext<undefined>): PromiseOr<void>;
};

export type PdkAction<A extends MaybeFrontendAction = MaybeFrontendAction> = A extends FrontendAction
  ? NamedAction<A>
  : GenericAction;

export type ActionCallbacks = {
  start?(): PromiseOr<void>;
  end?(): PromiseOr<void>;
};

/**
 * The final action type that can be executed.
 * @see createAction
 * @see createActions
 */
export type ResolvedAction = BaseAction & {
  id: string;
  standalone?: boolean;
  onClick(): PromiseOr<void>;
};

export type ActionParameters<A extends MaybeFrontendAction> = A extends FrontendAction
  ? ActionInput<FrontendActionEndpointMap[A]>
  : Record<string, unknown>;

export type ActionResponse<A extends MaybeFrontendAction> = A extends FrontendAction
  ? EndpointResponse<FrontendActionEndpointMap[A]>
  : void;

export enum FrontendAction {
  CONTEXT_FETCH = 'contextFetch',

  ACCOUNT_UPDATE = 'accountUpdate',

  ORDERS_EXPORT = 'ordersExport',
  ORDERS_EXPORT_PRINT = 'ordersExportPrint',
  ORDERS_PRINT = 'ordersPrint',
  ORDERS_FETCH = 'ordersFetch',
  ORDERS_UPDATE = 'ordersUpdate',

  SHIPMENTS_CREATE_RETURN = 'shipmentsReturn',
  SHIPMENTS_DELETE = 'shipmentsDelete',
  SHIPMENTS_PRINT = 'shipmentsPrint',
  SHIPMENTS_FETCH = 'shipmentsFetch',

  PLUGIN_SETTINGS_UPDATE = 'pluginSettingsUpdate',
  PRODUCT_SETTINGS_UPDATE = 'productSettingsUpdate',

  WEBHOOKS_CREATE = 'webhooksCreate',
  WEBHOOKS_DELETE = 'webhooksDelete',
  WEBHOOKS_FETCH = 'webhooksFetch',
}

export type PrintAction =
  | FrontendAction.SHIPMENTS_PRINT
  | FrontendAction.ORDERS_PRINT
  | FrontendAction.ORDERS_EXPORT_PRINT;

export type UpdateOrderAction =
  | FrontendAction.ORDERS_UPDATE
  | FrontendAction.ORDERS_EXPORT
  | FrontendAction.ORDERS_EXPORT_PRINT;

export type UpdateShipmentAction =
  | FrontendAction.SHIPMENTS_DELETE
  | FrontendAction.SHIPMENTS_FETCH
  | FrontendAction.ORDERS_EXPORT
  | FrontendAction.ORDERS_EXPORT_PRINT
  | FrontendAction.ORDERS_FETCH;
