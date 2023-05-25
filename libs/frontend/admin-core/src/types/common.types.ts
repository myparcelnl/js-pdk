import {OneOrMore} from '@myparcel/ts-utils';
import {Variant} from '@myparcel-pdk/common';

export type NotificationId = number | string;

export interface Notification {
  category?: NotificationCategory;
  content?: OneOrMore<string>;
  /**
   * ID of a notification. If not provided, a unique id will be generated. It may be a string, but make sure this string
   * does not exist in NotificationCategory.
   *
   * @see NotificationCategory
   */
  id?: NotificationId;
  timeout?: boolean | number;
  title?: string;
  variant: Variant;
}

export enum NotificationCategory {
  Api = 'api',
  General = 'general',
  Modal = 'modal',
}

export enum AdminIcon {
  Add = 'add',
  ArrowDown = 'arrow_down',
  ArrowUp = 'arrow_up',
  Close = 'close',
  Delete = 'delete',
  Download = 'download',
  Edit = 'edit',
  Export = 'export',
  External = 'external',
  No = 'no',
  Print = 'print',
  Refresh = 'refresh',
  Return = 'return',
  Save = 'save',
  Shipment = 'shipment',
  Spinner = 'spinner',
  Yes = 'yes',
}
