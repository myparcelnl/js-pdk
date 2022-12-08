import {ActionParameters, FrontendAction} from '../../data';
import {InputPdkButtonAction, OnClickAction, PdkButtonAction} from '../../types';
import {doAction} from '../../utils';
import {isOfType} from '@myparcel/ts-utils';

type CreateAction = <A extends FrontendAction = FrontendAction>(
  action: InputPdkButtonAction<A>,
  parameters?: ActionParameters<A>,
) => PdkButtonAction;

export const createAction: CreateAction = (input, args) => {
  if (isOfType<OnClickAction>(input, 'onClick')) {
    return input;
  }

  const {action, ...rest} = input;

  return {
    ...rest,
    id: action,
    onClick: async () => {
      await doAction(action, args);
    },
  };
};
