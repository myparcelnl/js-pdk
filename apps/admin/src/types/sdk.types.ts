import {type RecursivePartial} from '@myparcel-dev/ts-utils';
import {
  type AdminContextKey,
  type BackendEndpoint,
  type CarrierModel,
  type ExtractEndpointDefinition,
  type LabelFormat,
  type LabelOutput,
  type LabelPosition,
  type PdkEndpointDefinition,
  type Plugin,
  type Settings,
  type Shipment,
} from '@myparcel-dev/pdk-common';
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

interface DebugDownloadLogsDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.DownloadLogs;
  response: Blob;
}

interface DebugSwitchToAcceptanceApiDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.SwitchToAcceptanceApi;
  response: void;
}

interface DebugSwitchToProductionApiDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.SwitchToProductionApi;
  response: void;
}

interface ProxyCapabilitiesDefinition extends PdkEndpointDefinition {
  name: BackendEndpoint.ProxyCapabilities;
  /**
   * Action-control parameters live in the query string so the request body stays a clean
   * mirror of the actual capabilities API contract.
   *
   * `filterSupported` (opt-in): when `'true'`, the action applies the registered-option allowlist
   * server-side (`Carrier::filterRegisteredOptions`). Absent / any other value preserves the
   * unfiltered SDK passthrough for existing callers.
   */
  parameters?: {filterSupported?: boolean};
  /**
   * Body shape mirrors the actual capabilities API request: camelCase keys at every level
   * matching the SDK's attribute maps (`countryCode`, `physicalProperties`, `packageType`,
   * `deliveryType`). The PHP action translates these top-level camelCase keys to the
   * snake_case names the SDK PHP model uses internally — generic translation read from the
   * SDK's own attribute map.
   *
   * `physicalProperties.weight` is an object `{value, unit}`, not a primitive — that's how the
   * SDK's `PhysicalPropertiesWeightV2` model defines it on the wire.
   */
  body: {
    recipient: {countryCode: string};
    physicalProperties?: {
      weight?: {value: number; unit: 'g' | 'kg'};
    };
    carrier?: string;
    packageType?: string;
    deliveryType?: string;
    options?: string[];
  };
  response: {results: CarrierModel[]};
  formattedResponse: CarrierModel[];
}

/**
 * Body / parameters / call shape for `pdk.proxyCapabilities`. Both order-scoped and
 * shipment-scoped query composables share these — the order-scoped call simply omits
 * `parameters` at the call site. Derived from {@link ProxyCapabilitiesDefinition} so any
 * change to the endpoint contract flows through automatically.
 */
export type ProxyCapabilitiesBody = NonNullable<ProxyCapabilitiesDefinition['body']>;

export type ProxyCapabilitiesParameters = NonNullable<ProxyCapabilitiesDefinition['parameters']>;

export type ProxyCapabilitiesCall = (options: {
  body: ProxyCapabilitiesBody;
  parameters?: ProxyCapabilitiesParameters;
}) => Promise<ProxyCapabilitiesDefinition['response']>;

export type BackendEndpointDefinition =
  | CreateWebhooksDefinition
  | DebugDownloadLogsDefinition
  | DebugSwitchToAcceptanceApiDefinition
  | DebugSwitchToProductionApiDefinition
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
  | ProxyCapabilitiesDefinition
  | UpdateAccountDefinition
  | UpdateOrdersDefinition
  | UpdatePluginSettingsDefinition
  | UpdateProductSettingsDefinition
  | UpdateShipmentsDefinition;

export type BackendEndpointOptions<N extends BackendEndpoint> = Omit<
  ExtractEndpointDefinition<N, BackendEndpointDefinition>,
  'name' | 'response'
>;
