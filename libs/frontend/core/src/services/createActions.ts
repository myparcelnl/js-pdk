import {ActionCallbacks, createAction} from './index';
import {ActionParameters, FrontendAction} from '../actions';
import {InputPdkButtonAction, PdkButtonAction} from '../types';
import {OneOrMore, toArray} from '@myparcel/ts-utils';

export const createActions = <A extends FrontendAction = FrontendAction>(
  actions: OneOrMore<InputPdkButtonAction<A>>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
): PdkButtonAction[] => {
  return toArray(actions).map((action) => createAction(action, parameters, callbacks));
};
