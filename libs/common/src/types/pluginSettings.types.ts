import {type PackageTypeName} from '@myparcel/constants';
import {type TriState} from '../data';

export type LabelFormat = 'a4' | 'a6';

export type LabelOutput = 'open' | 'download';

type LabelPositionNumber = 1 | 2 | 3 | 4;

export type LabelPosition = LabelPositionNumber | `${LabelPositionNumber}`;

/**
 * @see 'allowedShippingMethodsKeys' in pdk config
 */
export type ShippingMethodType =
  | TriState.Off
  | TriState.Inherit
  | PackageTypeName.Package
  | PackageTypeName.PackageSmall
  | PackageTypeName.Mailbox
  | PackageTypeName.DigitalStamp
  | PackageTypeName.Letter;

export type ShippingMethodId = string;

/**
 * Shipping method types as keys and an array of shipping method IDs as values. Each shipping method ID can only be in one array.
 *
 * Example:
 * ```json
 * {
 *   "off": [ "method_5" ],
 *   "inherit": [ "method_1", "method_2" ],
 *   "package": [ "method_3" ],
 *   "package_small": [],
 *   "mailbox": [ "method_4" ],
 *   "digital_stamp": [],
 *   "letter": []
 * }
 * ```
 */
export type ShippingMethodTypeMap = Record<ShippingMethodType, ShippingMethodId[]>;
