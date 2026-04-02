/**
 * Carrier-specific inter-field dependencies for shipment options.
 *
 * Uses `string` keys because option names come from the carrier context at
 * runtime and are not known at compile time.
 *
 * The structure mirrors the future API response format (`requires`/`excludes`
 * per option) so this map can be replaced by context data when available.
 *
 * - `requires`: when the source option is turned on, these fields are forced
 *   on and made read-only.
 * - `excludes`: when the source option is turned on, these fields are forced
 *   off and made read-only.
 *
 * @TODO Replace with `carrier.options[key].requires` / `carrier.options[key].excludes`
 *       from context when the API provides inter-option dependency data.
 */
export type OptionDependencies = {
  requires?: string[];
  excludes?: string[];
};

const fieldDependencies: Record<string, Record<string, OptionDependencies>> = {
  POSTNL: {
    requiresAgeVerification: {
      requires: ['recipientOnlyDelivery', 'requiresSignature'],
      excludes: ['requiresReceiptCode'],
    },
  },
  DHL_FOR_YOU: {
    requiresAgeVerification: {
      excludes: ['requiresSignature'],
    },
    recipientOnlyDelivery: {
      excludes: ['requiresAgeVerification'],
    },
    requiresReceiptCode: {
      excludes: ['requiresAgeVerification'],
    },
  },
};

/**
 * Look up inter-field dependencies for a given carrier and option name.
 * Returns undefined if no dependencies are defined.
 */
export const getFieldDependencies = (
  carrierName: string,
  optionName: string,
): OptionDependencies | undefined => {
  return fieldDependencies[carrierName]?.[optionName];
};
