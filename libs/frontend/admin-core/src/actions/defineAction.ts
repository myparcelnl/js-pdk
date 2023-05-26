import {type AnyAdminAction} from '../types';

export const defineAction = <A extends AnyAdminAction>(input: A): A => {
  return input;
};
