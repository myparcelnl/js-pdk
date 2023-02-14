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

export interface FetchContextDefinition extends Definition {
  name: BackendEndpoint.FETCH_CONTEXT;
  parameters: undefined;
  response: [AdminContextObject];
  formattedResponse: AdminContextObject;
}

export interface UpdateAccountDefinition extends Definition {
  name: BackendEndpoint.UPDATE_ACCOUNT;
  parameters: undefined;
  body: Settings.ModelAccountSettings;
  response: Account.ModelAccount[];
}

export interface FetchOrdersDefinition extends Definition {
  name: BackendEndpoint.FETCH_ORDERS;
  parameters: {
    orderIds: string;
  };
  response: [Plugin.ModelContextOrderDataContext];
  formattedResponse: Plugin.ModelContextOrderDataContext;
}

export interface ExportOrdersDefinition extends Definition {
  name: BackendEndpoint.EXPORT_ORDERS;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdateOrdersDefinition extends Definition {
  name: BackendEndpoint.UPDATE_ORDERS;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface DeleteShipmentsDefinition extends Definition {
  name: BackendEndpoint.DELETE_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdateShipmentsDefinition extends Definition {
  name: BackendEndpoint.FETCH_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdatePluginSettingsDefinition extends Definition {
  name: BackendEndpoint.UPDATE_PLUGIN_SETTINGS;
  body: Settings.ModelSettings;
  parameters: undefined;
  response: Settings.ModelSettings[];
}

export interface UpdateProductSettingsDefinition extends Definition {
  name: BackendEndpoint.UPDATE_PRODUCT_SETTINGS;
  parameters: {
    productIds: string;
  };
  body: Settings.ModelProductSettings;
  response: Settings.ModelProductSettings[];
}

export interface PrintShipmentsDefinition extends Definition {
  name: BackendEndpoint.PRINT_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
    format?: LabelFormat;
    output?: LabelOutput;
    position?: LabelPosition | string;
  };
  response: {pdfs: {url: string}[]};
}

export interface PrintOrdersDefinition extends Definition {
  name: BackendEndpoint.PRINT_ORDERS;
  parameters: {
    orderIds: string;
    format?: LabelFormat;
    output?: LabelOutput;
    position?: LabelPosition | string;
  };
  response: {pdfs: {url: string}[]};
}

export interface FetchWebhooksDefinition extends Definition {
  name: BackendEndpoint.FETCH_WEBHOOKS;
  parameters: never;
  response: WebhookDefinition[];
}

export interface CreateWebhooksDefinition extends Definition {
  name: BackendEndpoint.CREATE_WEBHOOKS;
  parameters: {hooks: string};
  response: WebhookDefinition[];
}

export interface DeleteWebhooksDefinition extends Definition {
  name: BackendEndpoint.DELETE_WEBHOOKS;
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
