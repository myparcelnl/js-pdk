import {type BackendEndpoint, type ExtractEndpointDefinition} from '@myparcel-pdk/common';
import {AbstractEndpoint} from '@myparcel/sdk';
import {type BackendEndpointDefinition} from '../../types';

export abstract class AbstractPdkEndpoint<N extends BackendEndpoint = BackendEndpoint> extends AbstractEndpoint<
  ExtractEndpointDefinition<N, BackendEndpointDefinition>
> {
  public declare readonly name: N | `${N}}`;
  public declare readonly path: string;
}
