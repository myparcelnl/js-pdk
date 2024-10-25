import {type AnyActionDefinition, type ResolvedAction} from '../../types/actions.types';
import {type ActionParameters} from '../../types/actions/parameters.types';
import {type MaybeAdminAction} from '../../types/actions/actions.types';
import {type AdminAction} from '../../data/constants';
import {type ActionContext} from '../../actions/executors/types';
import {executeAction} from '../../actions/executors/executeAction';
import {getActionIdentifier} from './getActionIdentifier';
import {createActionContext} from './createActionContext';

type CreateAction = (action: AnyActionDefinition) => ResolvedAction;

export const createAction: CreateAction = (action) => {
  const context = createActionContext(action as AnyActionDefinition<AdminAction>);

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
