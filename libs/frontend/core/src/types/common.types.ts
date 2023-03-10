import {OneOrMore} from '@myparcel/ts-utils';
import {Variant} from '@myparcel-pdk/common/src';

export interface Notification {
  id?: number;
  category?: NotificationCategory;
  title?: string;
  content?: OneOrMore<string>;
  variant: Variant;
  timeout?: boolean | number;
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
