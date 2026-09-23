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
  /**
   * Whether the recipient is a business. A platform derives this from the company name and reports
   * the flag, never the name: the PHP PDK keeps the company in `ContactDetails` and puts only the
   * flag in the checkout context.
   */
  IsBusiness = 'isBusiness',
  ShippingMethod = 'shippingMethod',
}
