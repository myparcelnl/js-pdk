import {OneOrMore} from '@myparcel/ts-utils';
import {PdkVariant} from '@myparcel-pdk/common';

export interface PdkNotification {
  content?: OneOrMore<string>;
  title?: string;
  variant: PdkVariant;
  category?: NotificationCategory;
}

export enum NotificationCategory {
  API = 'api',
  GENERAL = 'general',
  MODAL = 'modal',
}

export enum PdkIcon {
  ADD = 'add',
  ARROW_DOWN = 'arrow-down',
  ARROW_LEFT = 'arrow-left',
  ARROW_RIGHT = 'arrow-right',
  ARROW_UP = 'arrow-up',
  CLOSE = 'close',
  DELETE = 'delete',
  DOWNLOAD = 'download',
  EDIT = 'edit',
  EXPORT = 'export',
  EXTERNAL = 'external',
  LABEL = 'label',
  PRINT = 'print',
  REFRESH = 'refresh',
  RETURN = 'return',
  SAVE = 'save',
  WARNING = 'warning',
}
