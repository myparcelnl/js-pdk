import {ActionContext, ActionContextWithResponse} from '../actions';
import {ActionInput, AdminActionEndpointMap, EndpointResponse} from './endpoints.types';
import {MaybeRef} from '@vueuse/core';
import {AdminIcon} from './common.types';
import {PdkVariant} from '@myparcel-pdk/common/src';
import {PromiseOr} from '@myparcel/ts-utils';

export type MaybeAdminAction = AdminAction | undefined;

type BaseAction = {
  icon?: AdminIcon;
  label?: string;
  variant?: MaybeRef<PdkVariant>;
  disabled?: MaybeRef<boolean>;
  standalone?: boolean;
};

export type NamedAction<A extends AdminAction = AdminAction> = BaseAction & {
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

export type PdkAction<A extends MaybeAdminAction = MaybeAdminAction> = A extends AdminAction
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

export type ActionParameters<A extends MaybeAdminAction> = A extends AdminAction
  ? ActionInput<AdminActionEndpointMap[A]>
  : Record<string, unknown>;

export type ActionResponse<A extends MaybeAdminAction> = A extends AdminAction
  ? EndpointResponse<AdminActionEndpointMap[A]>
  : void;

export enum AdminAction {
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

export type PrintAction = AdminAction.SHIPMENTS_PRINT | AdminAction.ORDERS_PRINT | AdminAction.ORDERS_EXPORT_PRINT;

export type UpdateOrderAction = AdminAction.ORDERS_UPDATE | AdminAction.ORDERS_EXPORT | AdminAction.ORDERS_EXPORT_PRINT;

export type UpdateShipmentAction =
  | AdminAction.SHIPMENTS_DELETE
  | AdminAction.SHIPMENTS_FETCH
  | AdminAction.ORDERS_EXPORT
  | AdminAction.ORDERS_EXPORT_PRINT
  | AdminAction.ORDERS_FETCH;
