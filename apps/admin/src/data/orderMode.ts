export enum OrderMode {
  Shipments = 'Shipments',
  OrderV1 = 'OrderV1',
  OrderV2 = 'OrderV2',
}

export enum SubscriptionFeature {
  LegacyOrderManagement = 'LEGACY_ORDER_MANAGEMENT',
  OrderManagement = 'ORDER_MANAGEMENT',
}

/**
 * Mapping from the PHP-side `AccountFeaturesServiceInterface::ORDER_MODE_*`
 * integer constants to the JS-side {@see OrderMode} enum.
 */
const ORDER_MODE_BY_NUMERIC: Record<number, OrderMode> = {
  0: OrderMode.Shipments,
  1: OrderMode.OrderV1,
  2: OrderMode.OrderV2,
};

/**
 * Translate the numeric `effectiveOrderMode` emitted by the PDK admin context
 * (when present) into the JS-side {@see OrderMode} enum. Returns `undefined`
 * when the value is missing or not one of the known modes, so callers can fall
 * back to feature-based resolution.
 */
export const orderModeFromContextValue = (value: unknown): OrderMode | undefined => {
  if (typeof value === 'number' && value in ORDER_MODE_BY_NUMERIC) {
    return ORDER_MODE_BY_NUMERIC[value];
  }

  return undefined;
};

/**
 * Derive the active {@see OrderMode} from the raw IAM subscription features.
 *
 * Use this only as a fallback for environments where the PDK admin context does
 * not yet surface a pre-computed `effectiveOrderMode`. Prefer the context value
 * so any business rules layered on top in PHP (e.g. INT-1590's sales-channel
 * downgrade) take effect on the JS side automatically.
 */
export const resolveOrderMode = (features: string[]): OrderMode => {
  if (features.includes(SubscriptionFeature.OrderManagement)) return OrderMode.OrderV2;

  if (features.includes(SubscriptionFeature.LegacyOrderManagement)) return OrderMode.OrderV1;

  return OrderMode.Shipments;
};
