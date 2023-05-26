import {type MaybeRef} from '@vueuse/core';
import {
  type LabelPosition,
  type PdkEndpointResponse,
  type LabelOutput,
  type LabelFormat,
} from '@myparcel-pdk/common/src';
import {type Variant, type BackendEndpoint} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type PromiseOr, type ReverseMap, type OneOrMore} from '@myparcel/ts-utils';
import {type BackendEndpointDefinition} from '../sdk';
import {type ActionContext, type ActionContextWithResponse} from '../actions';
import {type AdminContextKey} from './context.types';
import {type AdminIcon} from './common.types';

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

export type BackendEndpointResponse<E extends BackendEndpoint> = PdkEndpointResponse<E, BackendEndpointDefinition>;

export interface AdminActionEndpointMap extends Record<AdminAction, BackendEndpoint> {
  [AdminAction.AccountUpdate]: BackendEndpoint.UpdateAccount;
  [AdminAction.ContextFetch]: BackendEndpoint.FetchContext;
  [AdminAction.OrdersExportPrint]: BackendEndpoint.ExportOrders;
  [AdminAction.OrdersExport]: BackendEndpoint.ExportOrders;
  [AdminAction.OrdersFetch]: BackendEndpoint.FetchOrders;
  [AdminAction.OrdersPrint]: BackendEndpoint.PrintOrders;
  [AdminAction.OrdersUpdate]: BackendEndpoint.UpdateOrders;
  [AdminAction.PluginSettingsUpdate]: BackendEndpoint.UpdatePluginSettings;
  [AdminAction.ProductSettingsUpdate]: BackendEndpoint.UpdateProductSettings;
  [AdminAction.ShipmentsDelete]: BackendEndpoint.DeleteShipments;
  [AdminAction.ShipmentsExportReturn]: BackendEndpoint.ExportReturn;
  [AdminAction.ShipmentsFetch]: BackendEndpoint.FetchShipments;
  [AdminAction.ShipmentsPrint]: BackendEndpoint.PrintShipments;
  [AdminAction.ShipmentsUpdate]: BackendEndpoint.UpdateShipments;
  [AdminAction.WebhooksCreate]: BackendEndpoint.CreateWebhooks;
  [AdminAction.WebhooksDelete]: BackendEndpoint.DeleteWebhooks;
  [AdminAction.WebhooksFetch]: BackendEndpoint.FetchWebhooks;
}

export type EndpointAdminActionMap = ReverseMap<AdminActionEndpointMap>;

type LabelOptions = {
  output?: LabelOutput;
  format?: LabelFormat;
  position?: OneOrMore<LabelPosition>;
};

export interface EndpointMutationInputMap extends Record<BackendEndpoint, Record<string, unknown>> {
  [BackendEndpoint.FetchContext]: {context?: OneOrMore<AdminContextKey>};

  [BackendEndpoint.UpdateAccount]: {form: FormInstance};

  [BackendEndpoint.ExportOrders]: {orderIds?: OneOrMore<string>; form?: false | FormInstance};
  [BackendEndpoint.FetchOrders]: {orderIds?: OneOrMore<string>};
  [BackendEndpoint.PrintOrders]: LabelOptions & {
    orderIds?: OneOrMore<string>;
    form?: false | FormInstance;
  };
  [BackendEndpoint.UpdateOrders]: {orderIds?: OneOrMore<string>; form: FormInstance};

  [BackendEndpoint.DeleteShipments]: {orderIds?: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [BackendEndpoint.ExportReturn]: {orderIds?: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [BackendEndpoint.FetchShipments]: {orderIds?: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [BackendEndpoint.UpdateShipments]: {orderIds?: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [BackendEndpoint.PrintShipments]: LabelOptions & {
    orderIds?: OneOrMore<string>;
    shipmentIds?: OneOrMore<number>;
    form?: false | FormInstance;
  };

  [BackendEndpoint.UpdatePluginSettings]: {form: FormInstance};
  [BackendEndpoint.UpdateProductSettings]: {form: FormInstance; productIds: OneOrMore<string>};

  [BackendEndpoint.CreateWebhooks]: {hooks: OneOrMore<string>};
  [BackendEndpoint.DeleteWebhooks]: {hooks: OneOrMore<string>};
  [BackendEndpoint.FetchWebhooks]: never;
}

export type ActionInput<E extends BackendEndpoint> = EndpointMutationInputMap[E];

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
