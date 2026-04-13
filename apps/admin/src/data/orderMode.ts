export enum OrderMode {
  Shipments = 'Shipments',
  OrderV1 = 'OrderV1',
  OrderV2 = 'OrderV2',
}

export enum SubscriptionFeature {
  LegacyOrderManagement = 'legacy_order_management',
  OrderManagement = 'order_management',
}

export const resolveOrderMode = (orderV1: boolean, orderV2: boolean): OrderMode => {
  if (orderV2) return OrderMode.OrderV2;

  if (orderV1) return OrderMode.OrderV1;

  return OrderMode.Shipments;
};
