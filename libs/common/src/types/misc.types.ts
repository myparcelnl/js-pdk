export type Variant = 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success' | 'dark' | 'light';

/**
 * Define the custom properties added to window.
 */
// declare export interface Window {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   MyParcel: Record<string, (...args: any) => Promise<any>>;
//   MyParcelActions: {
//     adminUrl: string;
//     deliveryOptionsUrl: string;
//     pathLabel: string;
//     pathLoading: string;
//     pathOrder: string;
//   };
//   MyParcelTranslations: Record<string, string>;
//   MyParcelConfiguration: MyParcelConfiguration;
// }

export type DateFormat = 'dateFormatFull' | 'dateFormatLite';

// export type RequestParameters<T = Record<string, undefined | null | string | number | (string | number)[]>> = T;
// export type RequestData = Record<string, string | RequestData>;

/* eslint-disable @typescript-eslint/naming-convention */

// export interface DeliveryOptions {
//   carrier: null | string;
//   date: null | string;
//   deliveryType: null | string;
//   isPickup: null | boolean;
//   packageType: null | string;
//   pickupLocation: null | never;
//   shipmentOptions: null | ShipmentOptions;
// }
//
// export interface ShipmentOptions {
//   age_check?: null | boolean;
//   insurance?: null | boolean;
//   label_description?: null | boolean;
//   large_format?: null | boolean;
//   only_recipient?: null | boolean;
//   return?: null | boolean;
//   signature?: null | boolean;
// }

// export interface LabelOptions {
//   age_check: boolean;
//   insurance: boolean;
//   only_recipient: boolean;
//   package_format: string;
//   package_type: number;
//   return: boolean;
//   signature: boolean;
// }

// export interface ExtraOptions {
//   digitalStampWeight: string;
//   labelAmount: number;
// }

// export type ModuleSettingsForm = '';
//
// export type ModuleSettingsFormItemConfigPropertyType = 'checkbox' | 'multi' | 'select' | 'submit' | 'switch' | 'text';

export interface AddCarrierValue {
  name: string;
  value: string;
}

// export interface ModuleSettingsFormItem {
//   action?: [string, string];
//   // options?: {}[];
//   attributes?: Record<string, never>;
//   children?: ModuleSettingsFormItem[];
//   description?: string;
//   label: string;
//   name?: string;
//   type: 'tab' | 'accordion' | ModuleSettingsFormItemConfigPropertyType;
//   value?: string | number | boolean;
// }

// export interface ModuleSettingsFormItemConfigProperty extends ModuleSettingsFormItem {
//   name?: string;
//   type: ModuleSettingsFormItemConfigPropertyType;
//   value?: string | number | boolean;
// }

// export interface Account {
//   id: number;
//   platform_id: number;
// }
//
// export interface Shop {
//   id: number;
//   name: string;
// }
//
// export interface Carrier {
//   human: string;
//   id: number;
//   name: string;
// }
//
// export interface CarrierOption {
//   carrier: Carrier;
//   enabled: boolean;
//   label: string;
//   optional: boolean;
// }
//
// export interface DropOffPoint {
//   box_number?: string;
//   cc: string;
//   city: string;
//   location_code: string;
//   location_name: string;
//   number: number;
//   number_suffix?: string;
//   postal_code: string;
//   region?: string;
//   retail_network_id: string;
//   state?: string;
//   street: string;
// }
//
// export interface CarrierConfiguration {
//   carrier_id: number;
//   default_drop_off_point: DropOffPoint;
//   default_drop_off_point_identifier: string;
// }
//
// export type NumberFormatter = (num: number) => string;
