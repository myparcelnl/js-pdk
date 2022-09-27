import {AbstractEndpoint, CreateDefinition} from '@myparcel/sdk';
import {EndpointMap, EndpointName, EndpointResponse} from '@myparcel/pdk-frontend-shared';

type EndpointMapDefinition<K extends EndpointName> = CreateDefinition<
  {
    name: K;
    headers: EndpointMap[K]['headers'];
    parameters: EndpointMap[K]['parameters'];
  } & EndpointResponse<K>
>;

export abstract class AbstractPdkEndpoint<E extends EndpointName = EndpointName> extends AbstractEndpoint<
  EndpointMapDefinition<E>
> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public readonly name: E;
}
