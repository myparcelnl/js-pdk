import {
  ActionParameters,
  ActionResponse,
  AdminAction,
  AnyAdminAction,
  EndpointAdminActionMap,
  MaybeAdminAction,
  Notification,
} from '../../types';
import {BackendEndpoint, Variant} from '@myparcel-pdk/common/src';
import {AdminInstance} from '../../data';

type BaseActionContext<A extends MaybeAdminAction> = {
  action: AnyAdminAction<A>;
  instance: AdminInstance;
  notifications?: Record<Variant, Notification>;
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

type EndpointSuffix = string | undefined;

export type QueryExecutorSuffixCallback<E extends BackendEndpoint> = (
  context: ActionContext<EndpointAdminActionMap[E]>,
) => EndpointSuffix;

export type QueryExecutor = <E extends BackendEndpoint>(
  endpoint: E,
  suffix?: EndpointSuffix | QueryExecutorSuffixCallback<E>,
) => (context: ActionContext<EndpointAdminActionMap[E]>) => Promise<ActionResponse<EndpointAdminActionMap[E]>>;
