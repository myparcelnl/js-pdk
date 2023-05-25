import {MaybeRef} from '@vueuse/core';
import {Variant} from '@myparcel-pdk/common';
import {PromiseOr} from '@myparcel/ts-utils';
import {ActionContext, ActionContextWithResponse} from '../actions';
import {ActionInput, AdminActionEndpointMap, BackendEndpointResponse} from './endpoints.types';
import {AdminIcon} from './common.types';

export type MaybeAdminAction = AdminAction | undefined;

type BaseAction = {
  icon?: AdminIcon;
  label?: string;
  variant?: MaybeRef<Variant | undefined>;
  disabled?: MaybeRef<boolean>;
  standalone?: boolean;
};

export type NamedAction<A extends AdminAction = AdminAction> = BaseAction & {
  name: A;
  handler(context: ActionContext<A>): PromiseOr<ActionResponse<A> | void>;
  beforeHandle?(context: ActionContext<A>): PromiseOr<ActionParameters<A>>;
  afterHandle?(context: ActionContextWithResponse<A>): PromiseOr<ActionResponse<A>>;
};

export type GenericAction = BaseAction & {
  id: string;
  handler(context: ActionContext<undefined>): PromiseOr<void>;
  beforeHandle?(context: ActionContext<undefined>): PromiseOr<void>;
  afterHandle?(context: ActionContext<undefined>): PromiseOr<void>;
};

export type AnyAdminAction<A extends MaybeAdminAction = MaybeAdminAction> = A extends AdminAction
  ? NamedAction<A>
  : GenericAction;

export type ActionDefinition = AnyAdminAction & {
  id: string;
  parameters: ActionParameters<MaybeAdminAction>;
};

/**
 * The final action type that can be executed.
 */
export type ResolvedAction = BaseAction & {
  id: string;
  standalone?: boolean;
  handler(parameters?: ActionParameters<AdminAction> | Record<string, unknown>): PromiseOr<void>;
};

export type ActionParameters<A extends MaybeAdminAction> = A extends AdminAction
  ? ActionInput<AdminActionEndpointMap[A]>
  : Record<string, unknown>;

export type MaybeActionParameters<A extends MaybeAdminAction> = ActionParameters<A> | void;

export type ActionResponse<A extends MaybeAdminAction> = A extends AdminAction
  ? BackendEndpointResponse<AdminActionEndpointMap[A]>
  : void;

export type MaybeActionResponse<A extends MaybeAdminAction> = ActionResponse<A> | void;

export enum AdminAction {
  ContextFetch = 'contextFetch',

  AccountUpdate = 'accountUpdate',

  OrdersExport = 'ordersExport',
  OrdersExportPrint = 'ordersExportPrint',
  OrdersPrint = 'ordersPrint',
  OrdersFetch = 'ordersFetch',
  OrdersUpdate = 'ordersUpdate',
  OrdersEdit = 'ordersEdit',

  ShipmentsDelete = 'shipmentsDelete',
  ShipmentsPrint = 'shipmentsPrint',
  ShipmentsUpdate = 'shipmentsUpdate',
  ShipmentsFetch = 'shipmentsFetch',
  ShipmentsExportReturn = 'shipmentsExportReturn',

  PluginSettingsUpdate = 'pluginSettingsUpdate',
  ProductSettingsUpdate = 'productSettingsUpdate',

  WebhooksCreate = 'webhooksCreate',
  WebhooksDelete = 'webhooksDelete',
  WebhooksFetch = 'webhooksFetch',
}

export type PrintAction = AdminAction.ShipmentsPrint | AdminAction.OrdersPrint;

export type OrderAction =
  | AdminAction.OrdersExport
  | AdminAction.OrdersExportPrint
  | AdminAction.OrdersPrint
  | AdminAction.OrdersFetch
  | AdminAction.OrdersUpdate
  | AdminAction.OrdersEdit;
