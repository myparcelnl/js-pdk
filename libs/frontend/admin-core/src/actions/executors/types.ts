import {type BackendEndpoint, type Variant} from '@myparcel-pdk/common';
import {
  type ActionParameters,
  type ActionResponse,
  type AnyAdminAction,
  type EndpointAdminActionMap,
  type MaybeAdminAction,
  type Notification,
  type AdminAction,
} from '../../types';
import {type AdminInstance} from '../../data';

export interface ActionContext<A extends MaybeAdminAction = undefined> {
  action: AnyAdminAction<A>;
  instance: AdminInstance;
  notifications: Record<Variant, Notification>;
  parameters: ActionParameters<A> | Record<string, unknown>;
}

export interface ActionContextWithResponse<A extends MaybeAdminAction = undefined> extends ActionContext<A> {
  response: ActionResponse<A>;
}

type EndpointSuffix = string | undefined;

type QueryExecutorSuffixCallback<A extends AdminAction> = (context: ActionContext<A>) => EndpointSuffix;

export type QueryExecutor = <
  E extends BackendEndpoint,
  A extends EndpointAdminActionMap[E] = EndpointAdminActionMap[E],
>(
  endpoint: E,
  suffix?: EndpointSuffix | QueryExecutorSuffixCallback<A>,
) => (context: ActionContext<A>) => Promise<ActionResponse<A>>;
