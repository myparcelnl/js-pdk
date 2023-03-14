import {LabelFormat, LabelOutput, LabelPosition} from '@myparcel-pdk/common';
import {AdminAction} from './actions.types';
import {AdminContextKey} from './context.types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type EndpointResponse<N extends BackendEndpoint> = PdkEndpointDefinition<N>['formattedResponse'] extends Record<
  string,
  unknown
>
  ? PdkEndpointDefinition<N>['formattedResponse']
  : PdkEndpointDefinition<N>['response'];

export type EndpointParameters<N extends BackendEndpoint> = PdkEndpointDefinition<N>['parameters'];

export interface AdminActionEndpointMap extends Record<AdminAction, BackendEndpoint> {
  [AdminAction.ContextFetch]: BackendEndpoint.FetchContext;
  [AdminAction.AccountUpdate]: BackendEndpoint.UpdateAccount;
  [AdminAction.OrdersExport]: BackendEndpoint.ExportOrders;
  [AdminAction.OrdersExportPrint]: BackendEndpoint.ExportOrders;
  [AdminAction.OrdersFetch]: BackendEndpoint.FetchOrders;
  [AdminAction.OrdersPrint]: BackendEndpoint.PrintOrders;
  [AdminAction.OrdersUpdate]: BackendEndpoint.UpdateOrders;
  [AdminAction.PluginSettingsUpdate]: BackendEndpoint.UpdatePluginSettings;
  [AdminAction.ProductSettingsUpdate]: BackendEndpoint.UpdateProductSettings;
  [AdminAction.ShipmentsCreateReturn]: BackendEndpoint.CreateReturnShipments;
  [AdminAction.ShipmentsDelete]: BackendEndpoint.DeleteShipments;
  [AdminAction.ShipmentsFetch]: BackendEndpoint.FetchShipments;
  [AdminAction.ShipmentsPrint]: BackendEndpoint.PrintShipments;
  [AdminAction.WebhooksCreate]: BackendEndpoint.CreateWebhooks;
  [AdminAction.WebhooksDelete]: BackendEndpoint.DeleteWebhooks;
  [AdminAction.WebhooksFetch]: BackendEndpoint.FetchWebhooks;
}

export type EndpointAdminActionMap = {
  [K in BackendEndpoint]: AdminActionEndpointMap[keyof AdminActionEndpointMap] extends K
    ? AdminActionEndpointMap[keyof AdminActionEndpointMap]
    : never;
};

export interface EndpointMutationInputMap extends Record<BackendEndpoint, Record<string, unknown>> {
  [BackendEndpoint.FetchContext]: {context?: OneOrMore<AdminContextKey>};

  [BackendEndpoint.UpdateAccount]: {form: FormInstance};

  [BackendEndpoint.ExportOrders]: {orderIds?: OneOrMore<string>; form?: FormInstance};
  [BackendEndpoint.FetchOrders]: {orderIds?: OneOrMore<string>};
  [BackendEndpoint.PrintOrders]: {
    orderIds?: OneOrMore<string>;
    form?: FormInstance;
    output?: LabelOutput;
    format?: LabelFormat;
    position?: LabelPosition;
  };
  [BackendEndpoint.UpdateOrders]: {orderIds?: OneOrMore<string>; form: FormInstance};

  [BackendEndpoint.CreateReturnShipments]: {orderIds?: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [BackendEndpoint.DeleteShipments]: {orderIds?: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [BackendEndpoint.FetchShipments]: {orderIds?: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [BackendEndpoint.PrintShipments]: {
    orderIds?: OneOrMore<string>;
    shipmentIds: OneOrMore<number>;
    form?: FormInstance;
    output?: LabelOutput;
    format?: LabelFormat;
    position?: LabelPosition;
  };

  [BackendEndpoint.UpdatePluginSettings]: {form: FormInstance};
  [BackendEndpoint.UpdateProductSettings]: {form: FormInstance; productIds: OneOrMore<string>};

  [BackendEndpoint.CreateWebhooks]: {hooks: OneOrMore<string>};
  [BackendEndpoint.DeleteWebhooks]: {hooks: OneOrMore<string>};
  [BackendEndpoint.FetchWebhooks]: never;
}

export type ActionInput<A extends BackendEndpoint> = EndpointMutationInputMap[A];
