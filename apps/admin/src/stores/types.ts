import {type UseMutationReturnType, type UseQueryReturnType} from '@tanstack/vue-query';
import {type AdminContextKey, type BackendEndpoint} from '@myparcel-pdk/common';
import {type ApiException} from '@myparcel/sdk';
import {type AdminContext} from '../types/context.types';
import {type BackendEndpointResponse} from '../types/actions/response.types';
import {type ActionInput} from '../types/actions/parameters.types';
import {type BackendMutationEndpoints, type BackendQueryEndpoints} from '../types/actions/endpoints.types';
import {type QueryModifier} from '../actions/executors/types';

type EndpointQuery<E extends BackendEndpoint> = E extends BackendMutationEndpoints
  ? UseMutationReturnType<BackendEndpointResponse<E>, ApiException, ActionInput<E>, unknown>
  : E extends BackendQueryEndpoints
  ? UseQueryReturnType<BackendEndpointResponse<E>, ApiException>
  : never;

export type ContextQuery<C extends AdminContextKey = AdminContextKey.Dynamic> = UseQueryReturnType<
  AdminContext<C>,
  ApiException
>;

export type ResolvedQuery<E extends BackendEndpoint = BackendEndpoint> = E extends BackendEndpoint
  ? EndpointQuery<E>
  : never;

export type RegisterQuery = {
  <E extends BackendEndpoint, Q extends ResolvedQuery<E> = ResolvedQuery<E>>(endpoint: E, query: Q, arg3?: never): Q;
  <E extends BackendEndpoint, Q extends ResolvedQuery<E> = ResolvedQuery<E>>(
    endpoint: E,
    modifier: QueryModifier<E>,
    query: Q,
  ): Q;
};
