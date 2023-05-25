import {ActionParameters, AdminAction, AnyAdminAction, MaybeAdminAction, ResolvedAction} from '../../types';
import {ActionContext, executeAction} from '../../actions';
import {getActionIdentifier} from './getActionIdentifier';
import {createActionContext} from './createActionContext';

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
