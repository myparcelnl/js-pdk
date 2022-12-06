import {PdkAction} from '../data';
import {PdkIcon} from './common.types';
import {Ref} from 'vue';
import {Variant} from '@myparcel-pdk/frontend-shared';

interface BaseAction {
  id?: string;
  label: string;
  icon?: PdkIcon;
  disabled?: Ref<boolean> | boolean;
}

export type InputPdkButtonAction<A extends PdkAction = PdkAction> = OnClickAction | NamedAction<A>;

export type NamedAction<A extends PdkAction = PdkAction> = BaseAction & {
  action: A;
};

export interface OnClickAction extends BaseAction {
  id: string;
  onClick(...args: unknown[]): void;
}

export type PdkButtonAction = OnClickAction;

export interface PdkDropdownAction extends NamedAction {
  standalone?: boolean;
  variant?: Variant;
}
