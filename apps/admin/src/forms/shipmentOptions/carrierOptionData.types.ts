/**
 * Shape of a single option entry from `carrier.options` in the context.
 *
 * All options have `isRequired` and `isSelectedByDefault`. Some options
 * carry additional data (e.g., insurance has `insuredAmount`). The index
 * signature captures these extra fields.
 */
export type CarrierOptionData = {
  isRequired: boolean;
  isSelectedByDefault: boolean;
  [key: string]: unknown;
};
