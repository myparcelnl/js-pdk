import {PromiseOr} from '@myparcel/ts-utils';
import {Address, OrderIdentifier} from '../types.ts';

export interface AsGuestInterface {
  addToCart(productId: number, quantity?: number): PromiseOr<this>;
  chooseDeliveryDate(date: string): PromiseOr<this>;
  chooseShippingMethod(method: string): PromiseOr<this>;
  expectDeliveryTypeToBe(type: 'pickup' | 'deliver'): PromiseOr<this>;
  expectToSeeFee(name: string, price: string): PromiseOr<this>;
  fillBillingAddress(address?: Partial<Address>): PromiseOr<this>;
  fillShippingAddress(address?: Partial<Address>): PromiseOr<this>;
  goToCheckout(): PromiseOr<this>;
  goToStore(): PromiseOr<this>;
  login(): PromiseOr<this>;
  placeOrder(): PromiseOr<OrderIdentifier>;
  selectSignature(): PromiseOr<this>;
  toggleShipmentOption(option: 'onlyRecipient' | 'signature'): PromiseOr<this>;
  toggleShippingAddress(): PromiseOr<this>;
  waitForCheckoutUpdate(): PromiseOr<this>;
}
