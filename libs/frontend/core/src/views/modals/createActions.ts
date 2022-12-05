import {InputPdkButtonAction, OnClickAction, PdkButtonAction, doAction} from '../../';
import {isOfType, toArray} from '@myparcel/ts-utils';

export const createActions = (actions: InputPdkButtonAction | InputPdkButtonAction[]): PdkButtonAction[] => {
  const actionsArray = toArray(actions);

  return actionsArray.map((input) => {
    if (isOfType<OnClickAction>(input, 'onClick')) {
      return input;
    }

    const {action, ...rest} = input;

    return {
      ...rest,
      id: action,
      onClick: async () => {
        await doAction(action, {});
      },
    };
  });
};
