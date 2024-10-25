import {type BackendEndpoint, type Variant} from '@myparcel-pdk/common';
import {type OneOrMore, type PromiseOr} from '@myparcel/ts-utils';
import {type PdkNotification} from '../../types/common.types';
import {type AdminInstance} from '../../types/admin.types';
import {type AnyActionDefinition} from '../../types/actions.types';
import {type ActionResponse, type BackendEndpointResponse} from '../../types/actions/response.types';
import {type ActionParameters} from '../../types/actions/parameters.types';
import {type EndpointAdminActionMap, type MaybeAdminAction} from '../../types/actions/actions.types';
import {type AdminAction} from '../../data/constants';

export type ResolvedAdminAction<A extends undefined | MaybeAdminAction | BackendEndpoint> = A extends MaybeAdminAction
  ? A
  : A extends keyof EndpointAdminActionMap
  ? EndpointAdminActionMap[A]
  : never;

export interface ActionContext<
  A extends MaybeAdminAction | BackendEndpoint = undefined,
  R extends ResolvedAdminAction<A> = ResolvedAdminAction<A>,
> {
  action: AnyActionDefinition<R>;
  instance: AdminInstance;
  notifications: Record<Variant, PdkNotification>;
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
