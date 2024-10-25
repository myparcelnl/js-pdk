import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type PlainModifier} from '../actions/executors/types';

export const createQueryCacheKey = <E extends BackendEndpoint>(endpoint: E, modifier?: PlainModifier): string => {
  return modifier ? `${endpoint}.${modifier}` : endpoint;
};
