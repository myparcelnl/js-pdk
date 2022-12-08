import {OnClickAction, PdkButtonAction} from '../../types';

type CreateButtonAction = (action: OnClickAction, ...args: unknown[]) => PdkButtonAction;

export const createButtonAction: CreateButtonAction = (input, ...args) => {
  const {onClick, ...rest} = input;

  return {
    ...rest,
    onClick: async () => {
      await onClick(...args);
    },
  };
};
