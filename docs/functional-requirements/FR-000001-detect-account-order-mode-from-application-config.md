# FR-000001 - Detect Account Order Mode from Application Config

## Status

Draft

## Parent Requirement

[BR-000001 - Order Modus V2 Feature Gating](../business-requirements/BR-000001-order-modus-v2-feature-gating.md)

## Description

The admin frontend (`apps/admin`, Vue 3) receives application configuration as context when the Vue app initializes. This config contains properties indicating the active order mode for the webshop owner's account. The exact property names are TBD.

This FR covers reading the order mode from the existing app config and exposing it as a reactive value that other components and composables can consume.

## Functional Details

- Read order mode state from the existing Vue application config context.
- The backend provides two boolean properties in the config (exact names TBD, e.g. `orderV1` and `orderV2`).
- Derive a single `OrderMode` enum value from these booleans using the following precedence:
  1. If `orderV2` is `true` → `OrderMode.OrderV2` (regardless of `orderV1` value)
  2. If `orderV1` is `true` (and `orderV2` is `false`) → `OrderMode.OrderV1`
  3. If both are `false` → `OrderMode.Shipments`
- Expose a reactive composable that returns the resolved `OrderMode` enum value, consumable by other components and composables.
- The config property name mapping must be centralized so that renaming the backend properties is a one-line change.
- No backend changes are required. This FR only covers reading what the backend already provides in the config.
- This replaces the current `pluginSettings.order.orderMode` boolean pattern, which only distinguished between order v1 (`true`) and shipments (`false`).

## Acceptance Criteria

1. Given `orderV2=true` and `orderV1=true`, when the admin app initializes, then the order mode is `OrderMode.OrderV2`.
2. Given `orderV2=true` and `orderV1=false`, when the admin app initializes, then the order mode is `OrderMode.OrderV2`.
3. Given `orderV2=false` and `orderV1=true`, when the admin app initializes, then the order mode is `OrderMode.OrderV1`.
4. Given `orderV2=false` and `orderV1=false`, when the admin app initializes, then the order mode is `OrderMode.Shipments`.
5. The order mode value is reactive and available to all components that need it.
6. Changing the config property names requires modification in exactly one location.
7. Existing code that uses `pluginSettings.order.orderMode` as a boolean is migrated to use the new `OrderMode` enum.
8. Unit tests cover the precedence logic for all four boolean combinations (`orderV2`/`orderV1` true/false).

## Priority

**High** -- This FR is a prerequisite for all other Order v2 feature-gating FRs. No gating logic can be implemented until the order mode is detectable and exposed as a reactive value.

## Technical Considerations

No Technical Requirements or Architectural Decision Records exist yet for this feature area. If decisions are made about the composable API shape, state management approach, or naming conventions, those should be captured as separate TR or ADR documents and referenced here.

## Dependencies

- The backend must provide order mode flags in the application config context. This is assumed to already be in place or in progress (out of scope for this FR).
- Other FRs in the BR-000001 decomposition (action gating, settings gating, regression prevention) depend on this FR being implemented first.

## Open Questions

- What are the exact property names in the application config for the order mode boolean flags?
