import {type BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type ActionContext, type PlainModifier, type QueryModifier} from './types';

export const resolveQuerySuffix = <E extends BackendEndpoint>(
  suffix: QueryModifier<E>,
  context: ActionContext<E>,
): PlainModifier => {
  // @ts-expect-error todo
  return typeof suffix === 'function' ? suffix(context) : suffix;
};
