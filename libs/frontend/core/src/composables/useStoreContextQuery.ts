import {ContextKey, PdkContext} from '../types';
import {ApiException} from '@myparcel/sdk';
import {EndpointName} from '@myparcel-pdk/common';
import {UseQueryReturnType} from '@tanstack/vue-query';
import {useStoreQuery} from './useStoreQuery';

type ContextQuery<C extends ContextKey> = UseQueryReturnType<PdkContext<C>, ApiException>;

// @ts-expect-error typescript being pedantic
export const useStoreContextQuery = <C extends ContextKey>(contextKey: C = ContextKey.DYNAMIC): ContextQuery<C> => {
  return useStoreQuery(EndpointName.FETCH_CONTEXT, contextKey) as ContextQuery<C>;
};
