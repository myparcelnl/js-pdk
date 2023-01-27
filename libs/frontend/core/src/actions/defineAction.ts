import {FrontendAction} from './consts';
import {PdkAction} from '../types';

export const defineAction = <A extends FrontendAction | undefined>(input: PdkAction<A>): PdkAction<A> => {
  return input;
};
