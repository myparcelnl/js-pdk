import {BackendEndpointDefinition} from '@myparcel-pdk/frontend-admin-core';
import {
  BackendEndpoint,
  LabelFormat,
  LabelOutput,
  LabelPosition,
  PdkEndpointParameters,
  PdkEndpointResponse,
} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore, ReverseMap} from '@myparcel/ts-utils';
import {AdminContextKey} from './context.types';
import {AdminAction} from './actions.types';

export type BackendEndpointResponse<E extends BackendEndpoint> = PdkEndpointResponse<E, BackendEndpointDefinition>;

export type BackendEndpointParameters<E extends BackendEndpoint> = PdkEndpointParameters<E, BackendEndpointDefinition>;

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
