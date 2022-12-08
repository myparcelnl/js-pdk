import {ActionParameters, FrontendAction} from '../data';
import {InputPdkButtonAction, PdkButtonAction} from '../types';
import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {createAction} from './index';

export const createActions = <A extends FrontendAction = FrontendAction>(
  actions: OneOrMore<InputPdkButtonAction<A>>,
  parameters?: ActionParameters<A>,
): PdkButtonAction[] => {
  const actionsArray = toArray(actions);
  return actionsArray.map((action) => createAction(action, parameters));
};
