import {
  ActionParameters,
  ActionResponse,
  AdminAction,
  EndpointAdminActionMap,
  MaybeAdminAction,
  Notification,
  PdkAction,
} from '../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {PdkAppInstance} from '../../data';

type BaseActionContext<A extends MaybeAdminAction> = {
  action: PdkAction<A>;
  instance: PdkAppInstance;
  notifications?: {
    success?: Notification;
    error?: Notification;
  };
};

/**
 * A AdminAction is a special action that calls a pdk request.
 */
type AdminActionContext<A extends AdminAction> = BaseActionContext<A> & {
  parameters: ActionParameters<A>;
};

/**
 * A generic action is not tied to a AdminAction.
 */
type GenericActionContext = BaseActionContext<undefined> & {
  parameters: Record<string, unknown>;
};

export type ActionContext<A extends MaybeAdminAction = MaybeAdminAction> = A extends AdminAction
  ? AdminActionContext<A>
  : GenericActionContext;

export type ActionContextWithResponse<A extends AdminAction> = ActionContext<A> & {
  response: ActionResponse<A>;
};

export type QueryExecutor = <E extends BackendEndpoint>(
  endpoint: E,
  suffix?: string,
) => (context: ActionContext<EndpointAdminActionMap[E]>) => Promise<ActionResponse<EndpointAdminActionMap[E]>>;
