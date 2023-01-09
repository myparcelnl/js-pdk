import {ActionParameters, FrontendAction} from '../../actions';
import {InputPdkButtonAction, OnClickAction, PdkButtonAction} from '../../types';
import {PromiseOr, isOfType} from '@myparcel/ts-utils';
import {createLogger} from '../logger';
import {doAction} from '../../utils';

export type ActionCallbacks = {
  start?(): PromiseOr<void>;
  end?(): PromiseOr<void>;
};

type CreateAction = <A extends FrontendAction = FrontendAction>(
  action: InputPdkButtonAction<A>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
) => PdkButtonAction;

export const createAction: CreateAction = (input, parameters, callbacks) => {
  if (isOfType<OnClickAction>(input, 'onClick')) {
    return input;
  }

  const {action, ...rest} = input;
  const logger = createLogger(action);

  return {
    ...rest,
    id: action,
    onClick: async () => {
      await callbacks?.start?.();
      await doAction({action, parameters, logger});
      await callbacks?.end?.();
    },
  };
};
