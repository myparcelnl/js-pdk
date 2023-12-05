import {toArray} from '@myparcel/ts-utils';
import {type ActionDefinition, type ActionParameters, type AnyActionDefinition} from '../types';
import {type AdminAction} from '../data';
import {instantiateAction} from './instantiateAction';

type InstantiateActions = {
  (action: AnyActionDefinition, parameters?: ActionParameters<AdminAction>): ActionDefinition[];
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (actions: AnyActionDefinition[], parameters?: ActionParameters<AdminAction>): ActionDefinition[];
};

export const instantiateActions: InstantiateActions = (actions, parameters) => {
  return toArray(actions).map((action) => instantiateAction(action, parameters));
};
