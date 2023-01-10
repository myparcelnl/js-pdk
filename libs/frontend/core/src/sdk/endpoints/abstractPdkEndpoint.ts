import {AbstractEndpoint, CreateDefinition} from '@myparcel/sdk';
import {EndpointName, LabelFormat, LabelOutput, LabelPosition, Plugin, Settings} from '@myparcel-pdk/common';
import {RecursivePartial} from '@myparcel/ts-utils';

export type GetOrdersDefinition = CreateDefinition<{
  name: EndpointName.GET_ORDERS;
  parameters: {
    orderIds: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}>;

export type ExportOrdersDefinition = CreateDefinition<{
  name: EndpointName.EXPORT_ORDERS;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
}>;

export type UpdateOrdersDefinition = CreateDefinition<{
  name: EndpointName.UPDATE_ORDERS;
  parameters: {
    orderIds: string;
  };
  body?: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
}>;

export type DeleteShipmentsDefinition = CreateDefinition<{
  name: EndpointName.DELETE_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  response: Plugin.ModelContextOrderDataContext[];
}>;

export type UpdateShipmentsDefinition = CreateDefinition<{
  name: EndpointName.UPDATE_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
  };
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
}>;

export type UpdatePluginSettingsDefinition = CreateDefinition<{
  name: EndpointName.UPDATE_PLUGIN_SETTINGS;
  body: Settings.ModelSettings;
  response: Settings.ModelSettings[];
}>;

export type UpdateProductSettingsDefinition = CreateDefinition<{
  name: EndpointName.UPDATE_PRODUCT_SETTINGS;
  parameters: {
    productIds: string;
  };
  body: Settings.ModelProductSettings;
  response: Settings.ModelProductSettings[];
}>;

export type PrintShipmentsDefinition = CreateDefinition<{
  name: EndpointName.PRINT_SHIPMENTS;
  parameters: {
    orderIds: string;
    shipmentIds?: string;
    format?: LabelFormat;
    output?: LabelOutput;
    position?: LabelPosition | string;
  };
  response: {pdfs: {url: string}[]};
}>;

export type PdkEndpointDefinition<N extends EndpointName> = Extract<
  | GetOrdersDefinition
  | ExportOrdersDefinition
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
