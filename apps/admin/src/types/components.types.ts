import {type SlotsType} from 'vue';
import {type Size} from '@myparcel-pdk/common';
import {type AdminIcon, type AdminModalKey} from '../data';
import {type Translation} from './language.types';
import {type PdkElementProps} from './form.types';
import {type AdminModalContext} from './context.types';
import {
  type DefaultSlot,
  type PdkNotification,
  type PlainComponentProps,
  type PlainComponentSlots,
} from './common.types';
import {type ActionDefinition} from './actions.types';

/**
 * @see AdminComponent.Badge
 */
export type BadgeProps = PlainComponentProps;

export type BadgeSlots = PlainComponentSlots;

/**
 * @see AdminComponent.Box
 */
export type BoxProps = {
  /**
   * Used to control loading state.
   */
  loading: boolean;

  /**
   * Size of the box.
   */
  size: Size;

  /**
   * Title of the box.
   */
  title?: string;
};

export type BoxEmits = (e: 'clickHeader') => void;

export type BoxSlots = DefaultSlot & {
  header(): never;
  footer(): never;
};

/**
 * @see AdminComponent.Button
 */
export type ButtonProps = {
  /**
   * Controls disabled state.
   */
  disabled?: boolean;

  /**
   * Icon.
   */
  icon: AdminIcon | null;

  /**
   * Button label. Can be used instead of the slot.
   */
  label: string;

  /**
   * Size of the button.
   */
  size: Size;
};

export type ButtonEmits = (e: 'click') => void;

export type ButtonSlots = DefaultSlot;

/**
 * @see AdminComponent.ButtonGroup
 */
export type ButtonGroupProps = PlainComponentProps;

export type ButtonGroupSlots = PlainComponentSlots;

/**
 * @see AdminComponent.Col
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ColProps = {};

export type ColSlots = DefaultSlot;

/**
 * @see AdminComponent.ConceptBoxWrapper
 */
export type ConceptBoxWrapperProps = PlainComponentProps;

export type ConceptBoxWrapperSlots = PlainComponentSlots;

/**
 * @see AdminComponent.DropdownButton
 */
export type DropdownButtonProps = {
  /**
   * List of actions.
   */
  actions: ActionDefinition[];

  /**
   * Controls disabled state.
   */
  disabled?: boolean;

  /**
   * To hide the text of the standalone actions.
   */
  hideText?: boolean;

  /**
   * Size of the button.
   */
  size?: Size;
};

export type DropdownButtonSlots = DefaultSlot;

/**
 * @see AdminComponent.FormGroup
 */
export type FormGroupProps = PdkElementProps<
  never,
  {
    label?: Translation;
    description?: Translation;
    subtext?: Translation;
  }
>;

export type FormGroupSlots = DefaultSlot & {
  label(): never;
};

/**
 * @see AdminComponent.Heading
 */
export type HeadingProps = {
  level: number | string;
};

export type HeadingSlots = DefaultSlot;

/**
 * @see AdminComponent.Icon
 */
export type IconProps = {
  /**
   * The icon to display.
   */
  icon: AdminIcon;
};

/**
 * @see AdminComponent.Image
 */
export type ImageProps = {
  /**
   * The source of the image.
   */
  src: string;

  /**
   * The alternative text of the image.
   */
  alt: string;

  /**
   * The title of the image.
   */
  title?: string | null;

  /**
   * The width of the image.
   */
  width?: number | string | null;

  /**
   * The height of the image.
   */
  height?: number | string | null;
};

/**
 * @see AdminComponent.Link
 */
export type LinkProps = {
  action?: ActionDefinition;
  hideText?: boolean;
  href?: string;
};

export type LinkEmits = (e: 'click', event: MouseEvent) => void;

export type LinkSlots = DefaultSlot;

/**
 * @see AdminComponent.Loader
 */
export type LoaderProps = {
  /**
   * The size of the loader.
   */
  size: Size;

  /**
   * The html tag. Defaults to 'div'.
   */
  tag: string;
};

/**
 * @see AdminComponent.Modal
 */
export type ModalProps = {
  /**
   * Available actions in the modal.
   */
  actions?: ActionDefinition[];

  /**
   * Modal key.
   */
  modalKey: AdminModalKey;

  /**
   * Modal title.
   */
  title?: string;
};

export type ModalSlots = {
  default(context: AdminModalContext): never;
};

/**
 * @see AdminComponent.Notification
 */
export type NotificationProps = {
  /**
   * The notification to display.
   */
  notification: PdkNotification;
};

/**
 * @see AdminComponent.PluginSettingsWrapper
 */
export type PluginSettingsWrapperProps = PlainComponentProps;

export type PluginSettingsWrapperSlots = PlainComponentSlots;

/**
 * @see AdminComponent.Row
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type RowProps = {};

export type RowSlots = DefaultSlot;

/**
 * @see AdminComponent.SettingsDivider
 */
export type SettingsDividerProps = PdkElementProps<
  never,
  {
    content?: Translation;
    heading?: Translation;
    level?: number | string;
  }
>;

/**
 * @see AdminComponent.ShipmentLabelWrapper
 */
export type ShipmentLabelWrapperProps = PlainComponentProps;

export type ShipmentLabelWrapperSlots = PlainComponentSlots;

/**
 * @see AdminComponent.Table
 */
export type TableProps = {
  transition?: false | string;
};

export type TableSlots = DefaultSlot & {
  header(): never;
  footer(): never;
};

/**
 * The component that is used to render a table column in a Table.
 *
 * @see AdminComponent.TableCol
 */
export type TableColProps = {
  /**
   * Component to use as the table column. Defaults to 'td'.
   */
  component?: string;
};

export type TableColSlots = DefaultSlot;

/**
 * The component that is used to render a table row in a Table.
 *
 * @see AdminComponent.TableRow
 */
export type TableRowProps = {
  /**
   * Component to use as the table row. Defaults to 'tr'.
   */
  component?: string;
};

export type TableRowSlots = SlotsType<DefaultSlot>;

/**
 * @see AdminComponent.TabNavButton
 */
export type TabNavButtonProps = {
  active: boolean;
};

export type TabNavButtonEmits = (e: 'click') => void;

/**
 * @see AdminComponent.TabNavButtonWrapper
 */
export type TabNavButtonWrapperProps = PlainComponentProps;

export type TabNavButtonWrapperSlots = PlainComponentSlots;

/**
 * @see AdminComponent.TabNavContentWrapper
 */
export type TabNavContentWrapperProps = PlainComponentProps;

export type TabNavContentWrapperSlots = PlainComponentSlots;
