import {
  Account,
  BackendEndpoint,
  ExtractEndpointDefinition,
  LabelFormat,
  LabelOutput,
  LabelPosition,
  PdkEndpointDefinition,
  Plugin,
  Settings,
  Shipment,
  WebhookDefinition,
} from '@myparcel-pdk/common';
import {AbstractEndpoint} from '@myparcel/sdk';
import {AdminContextObject} from '../../types';
import {RecursivePartial} from '@myparcel/ts-utils';

export type PdfUrlResponse = {url: string};

export type PdfDataResponse = {data: string};

interface BasePrintDefinition extends PdkEndpointDefinition {
  formattedResponse: PdfUrlResponse | PdfDataResponse;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
    format?: LabelFormat;
    output?: LabelOutput;
    position?: LabelPosition;
  };
  response: (PdfUrlResponse | PdfDataResponse)[];
}

interface FetchContextDefinition extends PdkEndpointDefinition {
  formattedResponse: AdminContextObject;
  name: BackendEndpoint.FetchContext;
  parameters: {
    context: string;
  };
  response: [AdminContextObject];
}

interface UpdateAccountDefinition extends PdkEndpointDefinition {
  body: Settings.ModelAccountSettings;
  name: BackendEndpoint.UpdateAccount;
  parameters: undefined;
  response: Account.ModelAccount[];
}

interface FetchOrdersDefinition extends PdkEndpointDefinition {
  formattedResponse: Plugin.ModelContextOrderDataContext;
  name: BackendEndpoint.FetchOrders;
  parameters: {
    orderIds: string;
  };
  response: [Plugin.ModelContextOrderDataContext];
}

interface ExportOrdersDefinition extends PdkEndpointDefinition {
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  name: BackendEndpoint.ExportOrders;
  parameters: {
    orderIds: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}

interface UpdateOrdersDefinition extends PdkEndpointDefinition {
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  name: BackendEndpoint.UpdateOrders;
  parameters: {
    orderIds: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}

interface DeleteShipmentsDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.DeleteShipments;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}

interface UpdateShipmentsDefinition extends PdkEndpointDefinition {
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  name: BackendEndpoint.UpdateShipments;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Plugin.ModelContextOrderDataContext['shipments'];
}

interface FetchShipmentsDefinition extends PdkEndpointDefinition {
  formattedResponse: Shipment.ModelShipment;
  name: BackendEndpoint.FetchShipments;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Shipment.ModelShipment[];
}

interface UpdatePluginSettingsDefinition extends PdkEndpointDefinition {
  body: Settings.ModelSettings;
  name: BackendEndpoint.UpdatePluginSettings;
  parameters: undefined;
  response: Settings.ModelSettings[];
}

interface UpdateProductSettingsDefinition extends PdkEndpointDefinition {
  body: Settings.ModelProductSettings;
  name: BackendEndpoint.UpdateProductSettings;
  parameters: {
    productIds: string;
  };
  response: Settings.ModelProductSettings[];
}

interface PrintShipmentsDefinition extends BasePrintDefinition {
  name: BackendEndpoint.PrintShipments;
}

interface PrintOrdersDefinition extends BasePrintDefinition {
  name: BackendEndpoint.PrintOrders;
}

interface FetchWebhooksDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.FetchWebhooks;
  parameters: never;
  response: WebhookDefinition[];
}

interface CreateWebhooksDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.CreateWebhooks;
  parameters: {hooks: string};
  response: WebhookDefinition[];
}

interface DeleteWebhooksDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.DeleteWebhooks;
  parameters: {hooks: string};
  response: WebhookDefinition[];
}

export type BackendEndpointDefinition =
  | CreateWebhooksDefinition
  | DeleteShipmentsDefinition
  | DeleteWebhooksDefinition
  | ExportOrdersDefinition
  | FetchContextDefinition
  | FetchOrdersDefinition
  | FetchShipmentsDefinition
  | FetchWebhooksDefinition
  | PrintOrdersDefinition
  | PrintShipmentsDefinition
  | UpdateAccountDefinition
  | UpdateOrdersDefinition
  | UpdatePluginSettingsDefinition
  | UpdateProductSettingsDefinition
  | UpdateShipmentsDefinition;

export type BackendEndpointOptions<N extends BackendEndpoint> = Omit<
  ExtractEndpointDefinition<N, BackendEndpointDefinition>,
  'name' | 'response'
>;

export abstract class AbstractPdkEndpoint<N extends BackendEndpoint = BackendEndpoint> extends AbstractEndpoint<
  ExtractEndpointDefinition<N, BackendEndpointDefinition>
> {
  public declare readonly name: N;
  public declare readonly path: string;
}
