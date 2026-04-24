export enum OrderMode {
  Shipments = 'Shipments',
  OrderV1 = 'OrderV1',
  OrderV2 = 'OrderV2',
}

export enum SubscriptionFeature {
  LegacyOrderManagement = 'LEGACY_ORDER_MANAGEMENT',
  OrderManagement = 'ORDER_MANAGEMENT',
}

export const resolveOrderMode = (features: string[]): OrderMode => {
  if (features.includes(SubscriptionFeature.OrderManagement)) return OrderMode.OrderV2;

  if (features.includes(SubscriptionFeature.LegacyOrderManagement)) return OrderMode.OrderV1;

  return OrderMode.Shipments;
};
