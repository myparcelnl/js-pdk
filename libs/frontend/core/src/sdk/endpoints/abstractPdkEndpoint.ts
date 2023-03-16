import {AbstractEndpoint, EndpointDefinition} from '@myparcel/sdk';
import {
  Account,
  BackendEndpoint,
  LabelFormat,
  LabelOutput,
  LabelPosition,
  Plugin,
  Settings,
  WebhookDefinition,
} from '@myparcel-pdk/common/src';
import {AdminContextObject} from '../../types';
import {RecursivePartial} from '@myparcel/ts-utils';

interface Definition extends EndpointDefinition {
  formattedResponse?: unknown;
}

export type PdfUrlResponse = {url: string};

export type PdfDataResponse = {data: string};

interface BasePrintDefinition extends Definition {
  parameters: {
    orderIds: string;
    shipmentIds?: string;
    format?: LabelFormat;
    output?: LabelOutput;
    position?: LabelPosition;
  };
  response: (PdfUrlResponse | PdfDataResponse)[];
  formattedResponse: PdfUrlResponse | PdfDataResponse;
}

export interface FetchContextDefinition extends Definition {
  name: BackendEndpoint.FetchContext;
  parameters: {
    context: string;
  };
  response: [AdminContextObject];
  formattedResponse: AdminContextObject;
}

export interface UpdateAccountDefinition extends Definition {
  name: BackendEndpoint.UpdateAccount;
  parameters: undefined;
  body: Settings.ModelAccountSettings;
  response: Account.ModelAccount[];
}

export interface FetchOrdersDefinition extends Definition {
  name: BackendEndpoint.FetchOrders;
  parameters: {
    orderIds: string;
  };
  response: [Plugin.ModelContextOrderDataContext];
  formattedResponse: Plugin.ModelContextOrderDataContext;
}

export interface ExportOrdersDefinition extends Definition {
  name: BackendEndpoint.ExportOrders;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdateOrdersDefinition extends Definition {
  name: BackendEndpoint.UpdateOrders;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface DeleteShipmentsDefinition extends Definition {
  name: BackendEndpoint.DeleteShipments;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdateShipmentsDefinition extends Definition {
  name: BackendEndpoint.FetchShipments;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdatePluginSettingsDefinition extends Definition {
  name: BackendEndpoint.UpdatePluginSettings;
  body: Settings.ModelSettings;
  parameters: undefined;
  response: Settings.ModelSettings[];
}

export interface UpdateProductSettingsDefinition extends Definition {
  name: BackendEndpoint.UpdateProductSettings;
  parameters: {
    productIds: string;
  };
  body: Settings.ModelProductSettings;
  response: Settings.ModelProductSettings[];
}

export interface PrintShipmentsDefinition extends BasePrintDefinition {
  name: BackendEndpoint.PrintShipments;
}

export interface PrintOrdersDefinition extends BasePrintDefinition {
  name: BackendEndpoint.PrintOrders;
}

export interface FetchWebhooksDefinition extends Definition {
  name: BackendEndpoint.FetchWebhooks;
  parameters: never;
  response: WebhookDefinition[];
}

export interface CreateWebhooksDefinition extends Definition {
  name: BackendEndpoint.CreateWebhooks;
  parameters: {hooks: string};
  response: WebhookDefinition[];
}

export interface DeleteWebhooksDefinition extends Definition {
  name: BackendEndpoint.DeleteWebhooks;
  parameters: {hooks: string};
  response: WebhookDefinition[];
}

export type PdkEndpointDefinition<N extends BackendEndpoint> = Extract<
  | CreateWebhooksDefinition
  | DeleteShipmentsDefinition
  | DeleteWebhooksDefinition
  | ExportOrdersDefinition
  | FetchContextDefinition
  | FetchOrdersDefinition
  | FetchWebhooksDefinition
  | PrintOrdersDefinition
  | PrintShipmentsDefinition
  | UpdateAccountDefinition
  | UpdateOrdersDefinition
  | UpdatePluginSettingsDefinition
  | UpdateProductSettingsDefinition
  | UpdateShipmentsDefinition,
  {name: N}
>;

export type EndpointOptions<N extends BackendEndpoint> = Omit<PdkEndpointDefinition<N>, 'name' | 'response'>;

export abstract class AbstractPdkEndpoint<N extends BackendEndpoint = BackendEndpoint> extends AbstractEndpoint<
  PdkEndpointDefinition<N>
> {
  public declare readonly name: N;
  public declare readonly path: string;
}
