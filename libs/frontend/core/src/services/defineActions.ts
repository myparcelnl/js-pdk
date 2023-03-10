import {ActionDefinition, ActionParameters, AdminAction, AnyAdminAction} from '../types';
import {getActionIdentifier} from './actions';
import {toArray} from '@myparcel/ts-utils';

type DefineActions = {
  (action: AnyAdminAction, parameters?: ActionParameters<AdminAction>): ActionDefinition[];
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (actions: AnyAdminAction[], parameters?: ActionParameters<AdminAction>): ActionDefinition[];
};

export const defineActions: DefineActions = (actions, parameters) => {
  return toArray(actions).map((action) => ({
    ...action,
    id: getActionIdentifier(action as AnyAdminAction<AdminAction>),
    parameters: parameters ?? {},
  }));
};
