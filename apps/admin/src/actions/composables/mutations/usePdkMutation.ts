import {type MaybeRef} from '@vueuse/core';
import {useMutation, type UseMutationOptions, type UseMutationReturnType} from '@tanstack/vue-query';
import {type MutationFunction} from '@tanstack/query-core';
import {type ApiException} from '@myparcel/sdk';
import {type ActionInput, type BackendEndpointResponse} from '../../../types';
import {type BackendEndpoint} from '../../../data';

type MaybeRefDeep<T> = MaybeRef<
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function
    ? T
    : T extends object
    ? {
        [Property in keyof T]: MaybeRefDeep<T[Property]>;
      }
    : T
>;

type VueMutationObserverOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = {
  [Property in keyof UseMutationOptions<TData, TError, TVariables, TContext>]: MaybeRefDeep<
    UseMutationOptions<TData, TError, TVariables, TContext>[Property]
  >;
};

type UsePdkMutation = <
  E extends BackendEndpoint,
  TData extends BackendEndpointResponse<E> = BackendEndpointResponse<E>,
  TError extends ApiException = ApiException,
  TVariables extends ActionInput<E> = ActionInput<E>,
  TContext = unknown,
>(
  endpoint: E,
  mutationFn: MaybeRef<MutationFunction<TData, TVariables>>,
  options?: MaybeRef<
    Omit<VueMutationObserverOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>
  >,
) => UseMutationReturnType<TData, TError, TVariables, TContext>;

export const usePdkMutation: UsePdkMutation = (endpoint, mutationFn, options) => {
  return useMutation([endpoint], mutationFn, options);
};
