import {ActionContext, executeAction} from '../../actions';
import {ActionParameters, AdminAction, AnyAdminAction, MaybeAdminAction, ResolvedAction} from '../../types';
import {createActionContext} from './createActionContext';
import {getActionIdentifier} from './getActionIdentifier';
import {useLoading} from '../../composables';

type CreateAction = (action: AnyAdminAction) => ResolvedAction;

export const createAction: CreateAction = (action) => {
  const context = createActionContext(action as AnyAdminAction<AdminAction>);

  const {loading, setLoading} = useLoading();

  const data: ResolvedAction = {
    id: getActionIdentifier(action),
    icon: action.icon,
    label: action.label,
    variant: action.variant,
    disabled: action.disabled,
    standalone: action.standalone,

    loading,

    handler: async <A extends MaybeAdminAction>(parameters: ActionParameters<A>) => {
      setLoading(true);

      await executeAction({...context, parameters} as ActionContext<A>);

      setLoading(false);
    },
  };

  return data;
};
