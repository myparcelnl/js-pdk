import {OneOrMore} from '@myparcel/ts-utils';
import {PdkVariant} from '@myparcel-pdk/common';

export interface PdkNotification {
  id?: number;
  category?: NotificationCategory;
  title?: string;
  content?: OneOrMore<string>;
  variant: PdkVariant;
  timeout?: boolean | number;
}

export interface ResolvedPdkNotification extends PdkNotification {
  id: number;
  timeout: number;
  title: string;
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
  PRINT = 'print',
  REFRESH = 'refresh',
  RETURN = 'return',
  SAVE = 'save',
}
