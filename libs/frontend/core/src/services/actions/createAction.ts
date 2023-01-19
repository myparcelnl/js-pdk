import {ActionParameters, FrontendAction} from '../../actions';
import {InputPdkButtonAction, OnClickAction, PdkButtonAction, PdkNotification} from '../../types';
import {PromiseOr, isOfType} from '@myparcel/ts-utils';
import {createLogger} from '../logger';
import {doAction} from '../../utils';
import {usePdkInstance} from '../../composables/usePdkInstance';

export type ActionCallbacks = {
  start?(): PromiseOr<void>;
  end?(): PromiseOr<void>;
};

type CreateAction = <A extends FrontendAction = FrontendAction>(
  action: InputPdkButtonAction<A>,
  parameters?: ActionParameters<A>,
  callbacks?: ActionCallbacks,
) => PdkButtonAction;

export const createAction: CreateAction = (input, parameters, callbacks) => {
  if (isOfType<OnClickAction>(input, 'onClick')) {
    return input;
  }

  const {action, ...rest} = input;

  const instance = usePdkInstance();
  const logger = createLogger(action);

  return {
    ...rest,
    id: action,
    onClick: async () => {
      await callbacks?.start?.();

      const notifications = ['success', 'error'].reduce((acc, type) => {
        return {
          ...acc,
          [type]: {
            variant: type,
            title: `notification_${action}_${type}_title`,
            content: `notification_${action}_${type}_body_`,
          },
        };
      }, {} as Record<'success' | 'error', PdkNotification>);

      await doAction({
        action,
        parameters: parameters ?? {},
        instance: {...instance, logger},
        notifications,
      });

      await callbacks?.end?.();
    },
  };
};
