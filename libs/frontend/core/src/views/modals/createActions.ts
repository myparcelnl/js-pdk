import {ActionParameters, InputPdkButtonAction, OnClickAction, PdkAction, PdkButtonAction, doAction} from '../../';
import {OneOrMore, isOfType, toArray} from '@myparcel/ts-utils';

export const createAction = <A extends PdkAction = PdkAction>(
  input: InputPdkButtonAction<A>,
  args?: ActionParameters<A>,
): PdkButtonAction => {
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

export const createActions = (actions: OneOrMore<InputPdkButtonAction>): PdkButtonAction[] => {
  const actionsArray = toArray(actions);
  return actionsArray.map((action) => createAction(action));
};
