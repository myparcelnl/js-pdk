export enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping',
}

export enum AddressField {
  Address1 = 'address1',
  Address2 = 'address2',
  City = 'city',
  Country = 'country',
  PostalCode = 'postalCode',
}

export enum PdkField {
  AddressType = 'addressType',
  ShippingMethod = 'shippingMethod',
}

/**
 * Key a platform can add to the form data of an address to report a business recipient. It reports
 * the flag and never the company name, the same way the PHP PDK keeps the company in
 * `ContactDetails` and puts only the flag in the checkout context.
 *
 * It is not an `AddressField`, because those describe fields every platform has to provide.
 */
export const ADDRESS_FIELD_IS_BUSINESS = 'isBusiness';
