import {type BackendEndpoint} from '@myparcel-pdk/admin-common';
import {type PlainModifier} from '../actions';

export const createQueryCacheKey = <E extends BackendEndpoint>(endpoint: E, modifier?: PlainModifier): string => {
  return modifier ? `${endpoint}.${modifier}` : endpoint;
};
