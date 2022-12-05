import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {AbstractEndpoint} from '@myparcel/sdk';
import {RecursivePartial} from '@myparcel/ts-utils';

export type GetOrderDefinition = {
  name: EndpointName.GET_ORDERS;
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    orderIds: string;
  };
};

export type ExportOrderDefinition = Omit<UpdateOrderDefinition, 'parameters' | 'name'> & {
  name: EndpointName.EXPORT_ORDERS;
  parameters: {
    orderIds: string;
    print?: string;
  };
};

export type UpdateOrderDefinition = {
  name: EndpointName.UPDATE_ORDERS;
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    orderIds: string;
  };
};

export type RefreshShipmentsDefinition = {
  name: EndpointName.REFRESH_SHIPMENTS;
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    shipmentIds: string;
  };
};

type Definition<N extends EndpointName> = N extends EndpointName.GET_ORDERS
  ? GetOrderDefinition
  : N extends EndpointName.EXPORT_ORDERS
  ? ExportOrderDefinition
  : N extends EndpointName.UPDATE_ORDERS
  ? UpdateOrderDefinition
  : N extends EndpointName.REFRESH_SHIPMENTS
  ? RefreshShipmentsDefinition
  : never;

export type PdkEndpointDefinition<N extends EndpointName> = Omit<Definition<N>, 'name' | 'response'>;

export abstract class AbstractPdkEndpoint<N extends EndpointName = EndpointName> extends AbstractEndpoint<
  Definition<N>
> {
  public declare readonly name: N;
}
