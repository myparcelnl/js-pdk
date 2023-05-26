import {type OrderIdentifier, type ProductIdentifier} from '../types.ts';

export class TestState {
  protected static createdOrders: OrderIdentifier[] = [];

  protected static createdProducts: ProductIdentifier[] = [];

  public static addOrder(identifier: OrderIdentifier): void {
    TestState.createdOrders.push(identifier);
  }

  public static addProduct(identifier: ProductIdentifier): void {
    TestState.createdProducts.push(identifier);
  }

  public static getLastOrderIdentifier(): OrderIdentifier {
    return TestState.createdOrders[TestState.createdOrders.length - 1];
  }

  public static getLastProductIdentifier(): ProductIdentifier {
    return TestState.createdProducts[TestState.createdProducts.length - 1];
  }
}
