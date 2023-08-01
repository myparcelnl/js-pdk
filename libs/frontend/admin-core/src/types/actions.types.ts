import {type MaybeRef} from '@vueuse/core';
import {type Variant} from '@myparcel-pdk/common';
import {type OneOrMore, type PromiseOr} from '@myparcel/ts-utils';
import {type ActionContext, type ActionContextWithResponse, type QueryHandler} from '../actions';
import {type AdminIcon} from './common.types';
import {
  type ActionParameters,
  type ActionResponse,
  type AdminAction,
  type AdminActionEndpointMap,
  type MaybeAdminAction,
} from './actions';

interface BaseActionDefinition {
  disabled?: MaybeRef<boolean>;
  icon?: AdminIcon;
  label?: string;
  notifications?: OneOrMore<Variant>;
  standalone?: boolean;
  variant?: MaybeRef<Variant | undefined>;
  afterHandle?(...args: unknown[]): PromiseOr<unknown>;
  beforeHandle?(...args: unknown[]): PromiseOr<unknown>;
  handler(...args: unknown[]): PromiseOr<unknown>;
}

export interface NamedActionDefinition<A extends AdminAction = AdminAction> extends BaseActionDefinition {
  name: A;
  afterHandle?(context: ActionContextWithResponse<A>): PromiseOr<ActionResponse<A>>;
  beforeHandle?(context: ActionContext<A>): PromiseOr<ActionParameters<A>>;
  handler: QueryHandler<AdminActionEndpointMap[A]>;
}

export interface GenericActionDefinition extends BaseActionDefinition {
  name?: never;
  id: string;
  afterHandle?(context: ActionContextWithResponse): PromiseOr<void>;
  beforeHandle?(context: ActionContext): PromiseOr<void>;
  handler(context: ActionContext): PromiseOr<void>;
}

export type AnyActionDefinition<A extends MaybeAdminAction = MaybeAdminAction> = A extends AdminAction
  ? NamedActionDefinition<A>
  : GenericActionDefinition;

export type ActionDefinition<A extends MaybeAdminAction = MaybeAdminAction> = AnyActionDefinition<A> & {
  id: string;
  parameters?: ActionParameters<A>;
};

/**
 * The final action type that can be executed.
 */
export type ResolvedAction = BaseActionDefinition & {
  id: string;
  standalone?: boolean;
  handler(parameters?: ActionParameters<AdminAction> | Record<string, unknown>): PromiseOr<void>;
};
