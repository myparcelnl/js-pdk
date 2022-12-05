import {Variant} from '@myparcel-pdk/common';

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
}

export interface PdkNotification {
  content?: string | string[];
  title?: string;
  variant: Variant;
  category?: NotificationCategory;
}
