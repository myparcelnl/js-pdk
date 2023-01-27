import {ActionCallbacks, PdkAction, PdkDropdownAction, ResolvedAction} from '../../types';
import {ActionParameters, FrontendAction, executeAction} from '../../actions';
import {createActionContext} from './createActionContext';
import {getActionIdentifier} from './getActionIdentifier';
import {isOfType} from '@myparcel/ts-utils';
import {useMemoize} from '@vueuse/core';

type CreateAction = <A extends FrontendAction | undefined = FrontendAction | undefined>(
  action: PdkAction<A>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
) => ResolvedAction;

const createActionHandler: CreateAction = (action, parameters, callbacks) => {
  const context = createActionContext(action, parameters);
  context.instance?.logger?.info('createAction', action);

  const data: ResolvedAction = {
    id: getActionIdentifier(action),
    icon: action.icon,
    label: action.label,
    variant: action.variant,
    disabled: action.disabled,

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

  if (isOfType<PdkDropdownAction>(action, 'standalone')) {
    data.standalone = action.standalone;
  }

  return data;
};

export const createAction: CreateAction = useMemoize(createActionHandler);
