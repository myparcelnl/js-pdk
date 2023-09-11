import {type Component} from 'vue';
import {type Variant} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';

export type NotificationId = number | string;

export interface Notification {
  category?: NotificationCategory;
  content?: OneOrMore<string>;
  dismissible?: boolean;
  /**
   * ID of a notification. If not provided, a unique id will be generated. It may be a string, but make sure this string
   * does not exist in NotificationCategory.
   *
   * @see NotificationCategory
   */
  id?: NotificationId;
  /**
   * Arbitrary tags that can be set to distinguish notifications from each other.
   */
  tags?: Record<string, unknown>;
  timeout?: boolean | number;
  title?: string;
  variant: Variant;
}

export type ResolvedNotification = Notification & {
  id: NotificationId;
  timeout: boolean | number;
  dismissible: boolean;
};

export enum NotificationCategory {
  Action = 'action',
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

export type NotificationFilter = (notification: ResolvedNotification) => boolean;

export type OrderIds = OneOrMore<string>;

export type ShipmentIds = OneOrMore<string | number>;

export type ArrayItem<T> = T extends (infer U)[] ? U : T;

export interface TabDefinition {
  component: string | Component;
  description?: string;
  icon?: string;
  label: string;
  labelSuffix?: string;
  name: string;
  subtext?: string;
}

export type WebhookDefinition = {
  connected: boolean;
  hook: string;
  url: null | string;
};
