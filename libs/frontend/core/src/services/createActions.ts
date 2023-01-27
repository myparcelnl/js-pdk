import {ActionCallbacks, PdkAction, ResolvedAction} from '../types';
import {ActionParameters, FrontendAction} from '../actions';
import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {createAction} from './index';

export const createActions = <A extends FrontendAction | undefined>(
  action: OneOrMore<PdkAction<A>>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
): ResolvedAction[] => {
  return toArray(action).map((action) => createAction(action, parameters, callbacks));
};
