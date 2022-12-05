import {PdkAction} from '../data';
import {PdkIcon} from './common.types';
import {Ref} from 'vue';
import {Variant} from '@myparcel-pdk/common';

interface BaseAction {
  id?: string;
  label: string;
  icon?: PdkIcon;
  disabled?: Ref<boolean> | boolean;
}

export interface OnClickAction extends BaseAction {
  id: string;

  onClick(): void;
}

export interface NamedAction extends BaseAction {
  action: PdkAction;
}

export type InputPdkButtonAction = OnClickAction | NamedAction;

export type PdkButtonAction = OnClickAction;

export interface PdkDropdownAction extends NamedAction {
  standalone?: boolean;
  variant?: Variant;
}
