import {FrontendAction, MaybeFrontendAction, PdkAction} from '../../types';
import {isOfType} from '@myparcel/ts-utils';

export const getActionIdentifier = <A extends MaybeFrontendAction>(action: PdkAction<A>): string => {
  return isOfType<PdkAction<FrontendAction>>(action, 'name') ? action.name : action.id;
};
