export enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping',
}

export enum PdkEvent {
  CheckoutUpdate = 'checkoutUpdate',
  CheckoutUpdated = 'checkoutUpdated',
  StoreInitialize = 'storeInitialize',
  StoreInitialized = 'storeInitialized',
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

export type AddressFields = Record<AddressField, string>;
