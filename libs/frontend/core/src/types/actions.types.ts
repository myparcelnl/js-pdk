import {ActionContext, ActionContextWithResponse, ActionParameters, ActionResponse, FrontendAction} from '../actions';
import {PdkIcon} from './common.types';
import {PdkVariant} from '@myparcel-pdk/common';
import {PromiseOr} from '@myparcel/ts-utils';

export type MaybeFrontendAction = FrontendAction | undefined;

type BaseAction = {
  icon?: PdkIcon;
  label?: string;
  variant?: PdkVariant;
  disabled?: boolean;
};

export type NamedAction<A extends FrontendAction> = BaseAction & {
  name: A;
  handler(context: ActionContext<A>): PromiseOr<ActionResponse<A>>;
  beforeHandle?(context: ActionContext<A>): PromiseOr<ActionParameters<A>>;
  afterHandle?(context: ActionContextWithResponse<A>): PromiseOr<ActionResponse<A>>;
};

export type GenericAction = BaseAction & {
  id: string;
  handler(...args: unknown[]): PromiseOr<void>;
  beforeHandle?(...args: unknown[]): PromiseOr<void>;
  afterHandle?(...args: unknown[]): PromiseOr<void>;
};

export type PdkDropdownAction<A extends MaybeFrontendAction = MaybeFrontendAction> = AnyAction<A> & {
  standalone?: boolean;
};

export type InputPdkButtonAction<A extends MaybeFrontendAction = MaybeFrontendAction> =
  | PdkAction<A>
  | PdkDropdownAction<A>;

export type AnyAction<A extends MaybeFrontendAction = MaybeFrontendAction> = A extends FrontendAction
  ? NamedAction<A>
  : GenericAction;

export type PdkAction<A extends MaybeFrontendAction = MaybeFrontendAction> = AnyAction<A> | PdkDropdownAction<A>;

export type ActionCallbacks = {
  start?(): PromiseOr<void>;
  end?(): PromiseOr<void>;
};

/**
 * The final action type that can be executed.
 * @see createAction
 * @see createActions
 */
export type ResolvedAction = BaseAction & {
  id: string;
  standalone?: boolean;
  onClick(): PromiseOr<void>;
};
