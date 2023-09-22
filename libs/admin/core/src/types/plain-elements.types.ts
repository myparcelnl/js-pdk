import {type Size} from '@myparcel-pdk/common';
import {type PdkElementProps} from './form.types';
import {type ActionDefinition} from './actions.types';

/**
 * @see AdminComponent.DropdownButton
 */

export interface DropdownButtonProps {
  actions: ActionDefinition[];
  disabled?: boolean;
  hideText?: boolean;
  size?: Size;
}

/**
 * @see AdminComponent.FormGroup
 */

export type FormGroupProps = PdkElementProps<
  unknown,
  {
    label?: string;
    description?: string;
    subtext?: string;
  }
>;

/**
 * @see AdminComponent.SettingsDivider
 */

export type SettingsDividerProps = PdkElementProps<
  unknown,
  {
    content?: string;
    heading?: string;
    level?: number | string;
  }
>;

/**
 * @see AdminComponent.ShipmentLabelWrapper
 */

export interface ShipmentLabelWrapperProps {
  loading: boolean;
}
