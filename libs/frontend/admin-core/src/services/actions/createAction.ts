import {ActionContext, executeAction} from '../../actions';
import {ActionParameters, AdminAction, AnyAdminAction, MaybeAdminAction, ResolvedAction} from '../../types';
import {createActionContext} from './createActionContext';
import {getActionIdentifier} from './getActionIdentifier';

type CreateAction = (action: AnyAdminAction) => ResolvedAction;

export const createAction: CreateAction = (action) => {
  const context = createActionContext(action as AnyAdminAction<AdminAction>);

  return {
    id: getActionIdentifier(action),
    icon: action.icon,
    label: action.label,
    variant: action.variant,
    disabled: action.disabled,
    standalone: action.standalone,

    handler: async <A extends MaybeAdminAction>(parameters: ActionParameters<A>) => {
      await executeAction({...context, parameters} as ActionContext<A>);
    },
  };
};
