import {type BackendEndpoint, type Notification, type Variant} from '@myparcel-pdk/admin-common';
import {type OneOrMore, type PromiseOr} from '@myparcel/ts-utils';
import {
  type ActionParameters,
  type ActionResponse,
  type AdminAction,
  type AnyActionDefinition,
  type BackendEndpointResponse,
  type EndpointAdminActionMap,
  type MaybeAdminAction,
} from '../../types';
import {type AdminInstance} from '../../data';

export type ResolvedAdminAction<A extends undefined | MaybeAdminAction | BackendEndpoint> = A extends MaybeAdminAction
  ? A
  : A extends BackendEndpoint
  ? EndpointAdminActionMap[A]
  : never;

export interface ActionContext<
  A extends MaybeAdminAction | BackendEndpoint = undefined,
  R extends ResolvedAdminAction<A> = ResolvedAdminAction<A>,
> {
  action: AnyActionDefinition<R>;
  instance: AdminInstance;
  notifications: Record<Variant, Notification>;
  parameters: ActionParameters<R>;
}

export interface ActionContextWithResponse<A extends MaybeAdminAction = undefined> extends ActionContext<A> {
  response: ActionResponse<A>;
}

export type PlainModifier = string | number | undefined;

type ModifierCallback<A extends AdminAction | BackendEndpoint> = (context: ActionContext<A>) => PlainModifier;

export type QueryModifier<A extends undefined | AdminAction | BackendEndpoint = AdminAction> =
  | PlainModifier
  | (A extends BackendEndpoint ? ModifierCallback<A> : never);

export type QueryHandler<E extends BackendEndpoint = BackendEndpoint> = (
  context: ActionContext<E>,
) => PromiseOr<OneOrMore<BackendEndpointResponse<E>> | void>;
