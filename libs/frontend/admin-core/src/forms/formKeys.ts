import {AdminModalKey} from '../types';

export const FORM_KEY_ACCOUNT_SETTINGS = 'accountSettings';

export const FORM_KEY_MODAL = 'modal';

export const FORM_KEY_MODAL_PRINT_OPTIONS = AdminModalKey.PrintOptions;

export const FORM_KEY_MODAL_RETURN_OPTIONS = AdminModalKey.ReturnOptions;

export const FORM_KEY_MODAL_SHIPMENT_OPTIONS = AdminModalKey.ShipmentOptions;

export const FORM_KEY_PLUGIN_SETTINGS = 'pluginSettings';

export const FORM_KEY_PRODUCT_SETTINGS = 'productSettings';

export const FORM_KEY_CHILD_PRODUCT_SETTINGS = 'childProductSettings';

export const FORM_KEYS = [
  FORM_KEY_ACCOUNT_SETTINGS,
  FORM_KEY_CHILD_PRODUCT_SETTINGS,
  FORM_KEY_MODAL,
  FORM_KEY_MODAL_PRINT_OPTIONS,
  FORM_KEY_MODAL_RETURN_OPTIONS,
  FORM_KEY_MODAL_SHIPMENT_OPTIONS,
  FORM_KEY_PLUGIN_SETTINGS,
  FORM_KEY_PRODUCT_SETTINGS,
] as const;
