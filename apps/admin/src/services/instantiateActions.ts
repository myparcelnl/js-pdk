import {toArray} from '@myparcel/ts-utils';
import {type ActionDefinition, type ActionParameters, type AdminAction, type AnyActionDefinition} from '../types';
import {instantiateAction} from './instantiateAction';

type InstantiateActions = {
  (action: AnyActionDefinition, parameters?: ActionParameters<AdminAction>): ActionDefinition[];
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (actions: AnyActionDefinition[], parameters?: ActionParameters<AdminAction>): ActionDefinition[];
};

export const instantiateActions: InstantiateActions = (actions, parameters) => {
  return toArray(actions).map((action) => instantiateAction(action, parameters));
};
