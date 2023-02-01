import {
  ActionParameters,
  ActionResponse,
  EndpointFrontendActionMap,
  FrontendAction,
  MaybeFrontendAction,
  PdkAction,
  PdkNotification,
} from '../../types';
import {EndpointName} from '@myparcel-pdk/common';
import {PdkAppInstance} from '../../data';

type BaseActionContext<A extends MaybeFrontendAction> = {
  action: PdkAction<A>;
  instance: PdkAppInstance;
  notifications?: {
    success?: PdkNotification;
    error?: PdkNotification;
  };
};

/**
 * A FrontendAction is a special action that calls a pdk request.
 */
type FrontendActionContext<A extends FrontendAction> = BaseActionContext<A> & {
  parameters: ActionParameters<A>;
};

/**
 * A generic action is not tied to a FrontendAction.
 */
type GenericActionContext = BaseActionContext<undefined> & {
  parameters: Record<string, unknown>;
};

export type ActionContext<A extends MaybeFrontendAction = MaybeFrontendAction> = A extends FrontendAction
  ? FrontendActionContext<A>
  : GenericActionContext;

export type ActionContextWithResponse<A extends FrontendAction> = ActionContext<A> & {
  response: ActionResponse<A>;
};

export type QueryExecutor = <E extends EndpointName>(
  endpoint: E,
  suffix?: string,
) => (context: ActionContext<EndpointFrontendActionMap[E]>) => Promise<ActionResponse<EndpointFrontendActionMap[E]>>;
