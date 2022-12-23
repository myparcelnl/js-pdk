import {FrontendAction} from '../actions';
import {PdkIcon} from './common.types';
import {PdkVariant} from '@myparcel-pdk/common';
import {PromiseOr} from '@myparcel/ts-utils';
import {Ref} from 'vue';

interface BaseAction {
  id?: string;
  label: string;
  icon?: PdkIcon;
  disabled?: Ref<boolean> | boolean;
}

export type InputPdkButtonAction<A extends FrontendAction = FrontendAction> = OnClickAction | NamedAction<A>;

export type NamedAction<A extends FrontendAction = FrontendAction> = BaseAction & {
  action: A;
};

export interface OnClickAction extends BaseAction {
  id: string;

  onClick(...args: unknown[]): PromiseOr<void>;
}

export type PdkButtonAction = OnClickAction;

export interface PdkDropdownAction extends NamedAction {
  standalone?: boolean;
  variant?: PdkVariant;
}
