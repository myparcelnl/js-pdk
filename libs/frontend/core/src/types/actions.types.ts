import {ActionContext, ActionContextWithResponse} from '../actions';
import {ActionInput, AdminActionEndpointMap, EndpointResponse} from './endpoints.types';
import {AdminIcon} from './common.types';
import {MaybeRef} from '@vueuse/core';
import {PromiseOr} from '@myparcel/ts-utils';
import {Ref} from 'vue';
import {Variant} from '@myparcel-pdk/common/src';

export type MaybeAdminAction = AdminAction | undefined;

type BaseAction = {
  icon?: AdminIcon;
  label?: string;
  variant?: MaybeRef<Variant>;
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
  loading: Ref<boolean>;
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
  ORDERS_EDIT = 'ordersEdit',

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
