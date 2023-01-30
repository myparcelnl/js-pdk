import {AbstractEndpoint, EndpointDefinition} from '@myparcel/sdk';
import {EndpointName, LabelFormat, LabelOutput, LabelPosition, Plugin, Settings} from '@myparcel-pdk/common';
import {RecursivePartial} from '@myparcel/ts-utils';

interface Definition extends EndpointDefinition {
  formattedResponse?: unknown;
}

export interface FetchOrdersDefinition extends Definition {
  name: EndpointName.FETCH_ORDERS;
  parameters: {
    orderIds: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
  formattedResponse: Plugin.ModelContextOrderDataContext;
}

export interface ExportOrdersDefinition extends Definition {
  name: EndpointName.EXPORT_ORDERS;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdateOrdersDefinition extends Definition {
  name: EndpointName.UPDATE_ORDERS;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface DeleteShipmentsDefinition extends Definition {
  name: EndpointName.DELETE_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdateShipmentsDefinition extends Definition {
  name: EndpointName.FETCH_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>[];
  response: Plugin.ModelContextOrderDataContext[];
}

export interface UpdatePluginSettingsDefinition extends Definition {
  name: EndpointName.UPDATE_PLUGIN_SETTINGS;
  body: Settings.ModelSettings;
  parameters: undefined;
  response: Settings.ModelSettings[];
}

export interface UpdateProductSettingsDefinition extends Definition {
  name: EndpointName.UPDATE_PRODUCT_SETTINGS;
  parameters: {
    productIds: string;
  };
  body: Settings.ModelProductSettings;
  response: Settings.ModelProductSettings[];
}

export interface PrintShipmentsDefinition extends Definition {
  name: EndpointName.PRINT_SHIPMENTS;
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
  name: EndpointName.PRINT_ORDERS;
  parameters: {
    orderIds: string;
    format?: LabelFormat;
    output?: LabelOutput;
    position?: LabelPosition | string;
  };
  response: {pdfs: {url: string}[]};
}

export type PdkEndpointDefinition<N extends EndpointName> = Extract<
  | FetchOrdersDefinition
  | ExportOrdersDefinition
  | PrintOrdersDefinition
  | UpdateOrdersDefinition
  | DeleteShipmentsDefinition
  | UpdateShipmentsDefinition
  | UpdatePluginSettingsDefinition
  | PrintShipmentsDefinition
  | UpdateProductSettingsDefinition,
  {name: N}
>;

export type EndpointOptions<N extends EndpointName> = Omit<PdkEndpointDefinition<N>, 'name' | 'response'>;

export abstract class AbstractPdkEndpoint<N extends EndpointName = EndpointName> extends AbstractEndpoint<
  PdkEndpointDefinition<N>
> {
  public declare readonly name: N;
  public declare readonly path: string;
}
