import {ActionInput, BackendEndpointResponse} from '../../../../types';
import {UseMutationReturnType, VueMutationObserverOptions} from '@tanstack/vue-query/build/lib/useMutation';
import {ApiException} from '@myparcel/sdk';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {MaybeRef} from '@tanstack/vue-query/build/lib/types';
import {MutationFunction} from '@tanstack/query-core';
import {useMutation} from '@tanstack/vue-query';

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
