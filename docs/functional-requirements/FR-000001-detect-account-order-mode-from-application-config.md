# FR-000001 - Detect Account Order Mode from Application Config

## Status

Draft

## Parent Requirement

[BR-000001 - Order Modus V2 Feature Gating](../business-requirements/BR-000001-order-modus-v2-feature-gating.md)

## Description

The admin frontend (`apps/admin`, Vue 3) receives application configuration as context when the Vue app initializes. The account section of that context carries a `subscriptionFeatures: string[]` array, with each entry identifying a feature enabled on the webshop owner's subscription. The active order mode is derived from which order-management features are present in that array.

This FR covers reading those subscription features and exposing the resolved order mode as a reactive value that other components and composables can consume.

## Functional Details

- Read `account.subscriptionFeatures` from the existing Vue application context (dynamic context, not global config).
- Derive a single `OrderMode` enum value from the feature array using the following precedence:
  1. If the array includes `SubscriptionFeature.OrderManagement` (`'ORDER_MANAGEMENT'`) → `OrderMode.OrderV2` (regardless of which other features are present)
  2. Else if the array includes `SubscriptionFeature.LegacyOrderManagement` (`'LEGACY_ORDER_MANAGEMENT'`) → `OrderMode.OrderV1`
  3. Otherwise (including missing array, missing account, or only unrelated features) → `OrderMode.Shipments`
- Expose a reactive composable that returns the resolved `OrderMode` enum value, consumable by other components and composables.
- The feature-key constants are centralized in a single `SubscriptionFeature` enum so that renaming a backend feature identifier is a one-line change.
- No backend changes are required. This FR only covers reading what the backend already provides in the account context.
- This replaces the prior `pluginSettings.order.orderMode` boolean pattern, which only distinguished between order v1 (`true`) and shipments (`false`).

## Acceptance Criteria

1. Given `subscriptionFeatures` contains both `ORDER_MANAGEMENT` and `LEGACY_ORDER_MANAGEMENT`, when the admin app initializes, then the order mode is `OrderMode.OrderV2`.
2. Given `subscriptionFeatures` contains only `ORDER_MANAGEMENT`, when the admin app initializes, then the order mode is `OrderMode.OrderV2`.
3. Given `subscriptionFeatures` contains only `LEGACY_ORDER_MANAGEMENT`, when the admin app initializes, then the order mode is `OrderMode.OrderV1`.
4. Given `subscriptionFeatures` is empty, when the admin app initializes, then the order mode is `OrderMode.Shipments`.
5. Given `subscriptionFeatures` contains only unrelated feature keys, when the admin app initializes, then the order mode is `OrderMode.Shipments`.
6. Given `subscriptionFeatures` is undefined on the account, when the admin app initializes, then the order mode is `OrderMode.Shipments`.
7. Given the `account` object is undefined in the context, when the admin app initializes, then the order mode is `OrderMode.Shipments`.
8. The order mode value is reactive and available to all components that need it.
9. Renaming a backend feature identifier requires modification in exactly one location (the `SubscriptionFeature` enum).
10. Existing code that used `pluginSettings.order.orderMode` as a boolean is migrated to use the new `OrderMode` enum.
11. Unit tests cover the precedence logic for every case listed in criteria 1–7.

## Priority

**High** -- This FR is a prerequisite for all other Order v2 feature-gating FRs. No gating logic can be implemented until the order mode is detectable and exposed as a reactive value.

## Technical Considerations

No Technical Requirements or Architectural Decision Records exist yet for this feature area. If further decisions are made about the composable API shape, state management approach, or naming conventions, those should be captured as separate TR or ADR documents and referenced here.

Implementation landed in:

- `apps/admin/src/data/orderMode.ts` — `OrderMode` enum, `SubscriptionFeature` enum, and `resolveOrderMode(features)` pure function.
- `apps/admin/src/composables/context/useOrderMode.ts` — reactive composable wrapping `resolveOrderMode` over the dynamic context.
- `apps/admin/src/composables/context/useOrderMode.spec.ts` — unit tests covering every acceptance criterion.

## Dependencies

- The backend must populate `account.subscriptionFeatures` with the relevant feature keys. This is assumed to already be in place (out of scope for this FR).
- Other FRs in the BR-000001 decomposition (action gating, settings gating, regression prevention) depend on this FR being implemented first.
