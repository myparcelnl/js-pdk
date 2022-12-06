import {EndpointName, Plugin} from '@myparcel-pdk/frontend-shared';
import {AbstractEndpoint} from '@myparcel/sdk';
import {RecursivePartial} from '@myparcel/ts-utils';

export type DeleteLabelsDefinition = {
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    orderIds?: string;
    shipmentIds: string;
  };
};

export type ExportOrderDefinition = Omit<UpdateOrderDefinition, 'parameters'> & {
  parameters: {
    orderIds: string;
    print?: string;
  };
};

export type GetOrderDefinition = {
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    orderIds: string;
  };
};

export type PdkEndpointDefinition<N extends EndpointName> = Omit<Definition<N>, 'name' | 'response'>;

export type RefreshShipmentsDefinition = {
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    orderIds?: string;
    shipmentIds: string;
  };
};

type Definition<N extends EndpointName> = N extends EndpointName.GET_ORDERS
  ? GetOrderDefinition
  : N extends EndpointName.EXPORT_ORDERS
  ? ExportOrderDefinition
  : N extends EndpointName.UPDATE_ORDERS
  ? UpdateOrderDefinition
  : N extends EndpointName.DELETE_LABELS
  ? DeleteLabelsDefinition
  : N extends EndpointName.REFRESH_SHIPMENTS
  ? RefreshShipmentsDefinition
  : never;

export type UpdateOrderDefinition = {
  body: RecursivePartial<Plugin.ModelContextOrderDataContext>;
  response: Plugin.ModelContextOrderDataContext[];
  parameters: {
    orderIds: string;
  };
};

export abstract class AbstractPdkEndpoint<N extends EndpointName = EndpointName> extends AbstractEndpoint<
  Definition<N> & {name: N}
> {
  public declare readonly name: N;
}
