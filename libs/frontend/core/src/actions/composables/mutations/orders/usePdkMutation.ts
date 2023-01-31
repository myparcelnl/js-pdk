import {ActionInput, EndpointResponse} from '../../../../types';
import {UseMutationReturnType, VueMutationObserverOptions} from '@tanstack/vue-query/build/lib/useMutation';
import {ApiException} from '@myparcel/sdk';
import {EndpointName} from '@myparcel-pdk/common';
import {MaybeRef} from '@tanstack/vue-query/build/lib/types';
import {MutationFunction} from '@tanstack/query-core';
import {useMutation} from '@tanstack/vue-query';

type UsePdkMutation = <
  E extends EndpointName,
  TData = EndpointResponse<E>,
  TError = ApiException,
  TVariables = ActionInput<E>,
  TContext = unknown,
>(
  endpoint: E,
  mutationFn?: MaybeRef<MutationFunction<TData, TVariables>>,
  options?: MaybeRef<
    Omit<VueMutationObserverOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>
  >,
) => UseMutationReturnType<TData, TError, TVariables, TContext>;

export const usePdkMutation: UsePdkMutation = (endpoint, mutationFn, options) => {
  return useMutation([endpoint], mutationFn, options);
};
