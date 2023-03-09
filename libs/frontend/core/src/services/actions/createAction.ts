import {ActionCallbacks, ActionParameters, AdminAction, AnyAdminAction, ResolvedAction} from '../../types';
import {createActionContext} from './createActionContext';
import {executeAction} from '../../actions';
import {getActionIdentifier} from './getActionIdentifier';
import {useLoading} from '../../composables';
import {useMemoize} from '@vueuse/core';

type CreateAction = <A extends AdminAction | undefined = AdminAction | undefined>(
  action: AnyAdminAction<A>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
) => ResolvedAction;

const createActionHandler: CreateAction = (action, parameters, callbacks) => {
  const context = createActionContext(action, parameters);

  const {loading, setLoading} = useLoading();

  const data: ResolvedAction = {
    id: getActionIdentifier(action),
    icon: action.icon,
    label: action.label,
    variant: action.variant,
    disabled: action.disabled,
    standalone: action.standalone,

    loading,

    // @ts-expect-error todo
    parameters: action.parameters ?? {},

    onClick: async () => {
      setLoading(true);

      const startTime = Date.now();
      await callbacks?.start?.();
      context?.instance?.logger?.debug('Context', context);

      await executeAction(context);

      context?.instance?.logger?.debug('Done in ', Date.now() - startTime, 'ms');
      await callbacks?.end?.();

      setLoading(false);
    },
  };

  return data;
};

export const createAction: CreateAction = useMemoize(createActionHandler);
