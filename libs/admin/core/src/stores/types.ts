import {type UseMutationReturnType, type UseQueryReturnType} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-pdk/admin-common';
import {type ApiException} from '@myparcel/sdk';
import {
  type ActionInput,
  type AdminContext,
  type AdminContextKey,
  type BackendEndpointResponse,
  type BackendMutationEndpoints,
  type BackendQueryEndpoints,
} from '../types';
import {type QueryModifier} from '../actions';

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
