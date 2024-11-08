import {type Component} from 'vue';
import {type Variant} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type NotificationCategory} from '../data';
import {type Translation} from './language.types';

export type NotificationId = number | string;

export interface PdkNotification {
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
  tags?: Record<string, string>;
  timeout?: boolean | number;
  title?: string;
  variant: Variant;
}

export type ResolvedNotification = PdkNotification & {
  id: NotificationId;
  timeout: boolean | number;
  dismissible: boolean;
};

export type NotificationFilter = (notification: ResolvedNotification) => boolean;

export type OrderIds = OneOrMore<string>;

export type ShipmentIds = OneOrMore<string | number>;

export type ArrayItem<T> = T extends (infer U)[] ? U : T;

export interface TabDefinition {
  component: string | Component;
  description?: Translation;
  icon?: string;
  label: Translation;
  labelSuffix?: string;
  name: string;
  subtext?: Translation;
}

export type WebhookDefinition = {
  connected: boolean;
  hook: string;
  url: null | string;
};

export type DefaultSlot = {
  default(): never;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type PlainComponentProps = {};

export type PlainComponentSlots = DefaultSlot;
