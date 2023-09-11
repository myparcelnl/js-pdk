import {type Size} from '@myparcel-pdk/common';
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
