import {
  type AdminContextKey,
  type BackendEndpoint,
  type ExtractEndpointDefinition,
  type LabelFormat,
  type LabelOutput,
  type LabelPosition,
  type PdkEndpointDefinition,
  type Plugin,
  type Settings,
  type Shipment,
} from '@myparcel-pdk/common';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {type AdminContextObject} from './context.types';
import {type WebhookDefinition} from './common.types';

export type PdfUrlResponse = {
  url: string;
};

export type PdfDataResponse = {
  data: string;
};

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

interface DeleteAccountDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.UpdateAccount;
  body: undefined;
  parameters: undefined;
  response: [Pick<AdminContextObject, AdminContextKey.Dynamic | AdminContextKey.PluginSettingsView>];
  formattedResponse: Pick<AdminContextObject, AdminContextKey.Dynamic | AdminContextKey.PluginSettingsView>;
}

interface UpdateAccountDefinition extends PdkEndpointDefinition {
  body: Settings.ModelAccountSettings;
  name: BackendEndpoint.UpdateAccount;
  parameters: undefined;
  response: [Pick<AdminContextObject, AdminContextKey.Dynamic | AdminContextKey.PluginSettingsView>];
  formattedResponse: Pick<AdminContextObject, AdminContextKey.Dynamic | AdminContextKey.PluginSettingsView>;
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
  name: BackendEndpoint.FetchShipments;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Shipment.ModelShipment[];
  formattedResponse: Shipment.ModelShipment;
}

interface FetchProductsDefinition extends PdkEndpointDefinition {
  formattedResponse: Plugin.ModelContextProductDataContext;
  name: BackendEndpoint.FetchProducts;
  parameters: {
    productIds: string;
  };
  response: [Plugin.ModelContextProductDataContext];
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
  parameters: {
    hooks: string;
  };
  response: WebhookDefinition[];
}

interface DeleteWebhooksDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.DeleteWebhooks;
  parameters: {
    hooks: string;
  };
  response: WebhookDefinition[];
}

export type BackendEndpointDefinition =
  | CreateWebhooksDefinition
  | DeleteAccountDefinition
  | DeleteShipmentsDefinition
  | DeleteWebhooksDefinition
  | ExportOrdersDefinition
  | FetchContextDefinition
  | FetchOrdersDefinition
  | FetchProductsDefinition
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
