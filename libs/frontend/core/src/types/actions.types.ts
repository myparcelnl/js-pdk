import {FrontendAction} from '../data';
import {PdkIcon} from './common.types';
import {PromiseOr} from '@myparcel/ts-utils';
import {Ref} from 'vue';
import {Variant} from '@myparcel-pdk/common';

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
  variant?: Variant;
}
