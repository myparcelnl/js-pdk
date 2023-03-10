import {ActionContext, executeAction} from '../../actions';
import {ActionParameters, AdminAction, AnyAdminAction, ResolvedAction} from '../../types';
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

    handler: async <A extends AdminAction | undefined>(parameters: ActionParameters<A>) => {
      setLoading(true);

      const startTime = Date.now();
      // await callbacks?.start?.();
      context?.instance?.logger?.debug('Context', {...context, parameters});

      await executeAction({...context, parameters} as unknown as ActionContext<A>);

      context?.instance?.logger?.debug('Done in ', Date.now() - startTime, 'ms');
      // await callbacks?.end?.();

      setLoading(false);
    },
  };

  return data;
};
