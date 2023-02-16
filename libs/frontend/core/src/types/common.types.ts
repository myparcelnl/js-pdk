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
  API = 'api',
  GENERAL = 'general',
  MODAL = 'modal',
}

export enum AdminIcon {
  ADD = 'add',
  ARROW_DOWN = 'arrow_down',
  ARROW_UP = 'arrow_up',
  CLOSE = 'close',
  DELETE = 'delete',
  DOWNLOAD = 'download',
  EDIT = 'edit',
  EXPORT = 'export',
  EXTERNAL = 'external',
  NO = 'no',
  PRINT = 'print',
  REFRESH = 'refresh',
  RETURN = 'return',
  SAVE = 'save',
  SHIPMENT = 'shipment',
  SPINNER = 'spinner',
  YES = 'yes',
}
