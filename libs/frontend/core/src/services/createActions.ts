import {ActionCallbacks, ActionParameters, FrontendAction, PdkAction, ResolvedAction} from '../types';
import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {createAction} from './index';

export const createActions = (
  actions: OneOrMore<PdkAction>,
  parameters?: ActionParameters<FrontendAction>,
  callbacks?: ActionCallbacks,
): ResolvedAction[] => {
  return toArray(actions).map((action) => {
    // @ts-expect-error hard to get types assignable to all different PdkActions passed in actions
    return createAction(action, parameters, callbacks);
  });
};
