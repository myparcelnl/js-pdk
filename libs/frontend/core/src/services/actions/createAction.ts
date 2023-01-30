import {ActionCallbacks, ActionParameters, FrontendAction, PdkAction, ResolvedAction} from '../../types';
import {createActionContext} from './createActionContext';
import {executeAction} from '../../actions';
import {getActionIdentifier} from './getActionIdentifier';
import {useMemoize} from '@vueuse/core';

type CreateAction = <A extends FrontendAction | undefined = FrontendAction | undefined>(
  action: PdkAction<A>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
) => ResolvedAction;

const createActionHandler: CreateAction = (action, parameters, callbacks) => {
  const context = createActionContext(action, parameters);

  const data: ResolvedAction = {
    id: getActionIdentifier(action),
    icon: action.icon,
    label: action.label,
    variant: action.variant,
    disabled: action.disabled,
    standalone: action.standalone,

    // @ts-expect-error todo
    parameters: action.parameters ?? {},

    onClick: async () => {
      const startTime = Date.now();
      await callbacks?.start?.();
      context?.instance?.logger?.debug('Context', context);

      await executeAction(context);

      context?.instance?.logger?.debug('Done in ', Date.now() - startTime, 'ms');
      await callbacks?.end?.();
    },
  };

  return data;
};

export const createAction: CreateAction = useMemoize(createActionHandler);
