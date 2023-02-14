import {ActionCallbacks, ActionParameters, AdminAction, AnyAdminAction, ResolvedAction} from '../types';
import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {createAction} from './index';

export const createActions = (
  actions: OneOrMore<AnyAdminAction>,
  parameters?: ActionParameters<AdminAction>,
  callbacks?: ActionCallbacks,
): ResolvedAction[] => {
  return toArray(actions).map((action) => {
    // @ts-expect-error hard to get types assignable to all different PdkActions passed in actions
    return createAction(action, parameters, callbacks);
  });
};
