import {BackendEndpoint, LabelFormat, LabelOutput, LabelPosition} from '@myparcel-pdk/common/src';
import {AdminAction} from './actions.types';
import {AdminContextKey} from './context.types';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type EndpointResponse<N extends BackendEndpoint> = PdkEndpointDefinition<N> extends {
  formattedResponse: infer R;
}
  ? R
  : PdkEndpointDefinition<N>['response'];

export type EndpointParameters<N extends BackendEndpoint> = PdkEndpointDefinition<N>['parameters'];

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

export type EndpointAdminActionMap = {
  [K in BackendEndpoint]: AdminActionEndpointMap[keyof AdminActionEndpointMap] extends K
    ? AdminActionEndpointMap[keyof AdminActionEndpointMap]
    : never;
};

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

export type ActionInput<A extends BackendEndpoint> = EndpointMutationInputMap[A];
