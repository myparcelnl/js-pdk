import {type UseMutationReturnType, type VueMutationObserverOptions} from '@tanstack/vue-query/build/lib/useMutation';
import {type MaybeRef} from '@tanstack/vue-query/build/lib/types';
import {useMutation} from '@tanstack/vue-query';
import {type MutationFunction} from '@tanstack/query-core';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type ApiException} from '@myparcel/sdk';
import {type ActionInput, type BackendEndpointResponse} from '../../../../types';

type UsePdkMutation = <
  N extends BackendEndpoint,
  TData = BackendEndpointResponse<N>,
  TError = ApiException,
  TVariables = ActionInput<N>,
  TContext = unknown,
>(
  endpoint: N,
  mutationFn?: MaybeRef<MutationFunction<TData, TVariables>>,
  options?: MaybeRef<
    Omit<VueMutationObserverOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>
  >,
) => UseMutationReturnType<TData, TError, TVariables, TContext>;

export const usePdkMutation: UsePdkMutation = (endpoint, mutationFn, options) => {
  return useMutation([endpoint], mutationFn, options);
};
