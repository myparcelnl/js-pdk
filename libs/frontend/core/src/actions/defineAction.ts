import {PdkAction} from '../types';

export const defineAction = <A extends PdkAction>(input: A): A => {
  return input;
};
