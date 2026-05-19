# FR-000004 - Preserve Existing Behavior for Order V1 and No-Mode Accounts

## Status

Draft

## Parent Requirement

[BR-000001 - Order Modus V2 Feature Gating](../business-requirements/BR-000001-order-modus-v2-feature-gating.md)

## Description

This FR ensures that the feature gating introduced for Order v2 does not cause any regressions for webshop owners on Order v1 or with no order mode active. This is a non-functional safeguard requirement that explicitly constrains the implementation of the gating logic defined in FR-000001, FR-000002, and FR-000003 to be transparent when the detected mode is v1 or neither.

## Functional Details

- When **Order v1 is active**: the current "order modus" behavior is fully preserved. Order mode buttons / link (export, edit, "Toon in backoffice") remain available in the order grid and shipment modal. All settings tabs and sections remain visible.
- When **neither mode is active**: the current shipments-only behavior is fully preserved. All action buttons (export, print, export & print) remain available in the order grid and shipment modal. This was the default before any order mode existed. All UI elements remain as they are today.
- The introduction of the order mode detection (FR-000001) and the gating logic (FR-000002, FR-000003) must not alter any rendering or behavior when the detected mode is v1 or neither.
- No new UI elements, warnings, or banners are introduced for v1 or no-mode accounts.

## Acceptance Criteria

1. Given Order v1 is active, when the admin app loads, then the UI is identical to the current Order v1 behavior (no visual or functional changes).
2. Given neither order mode is active, when the admin app loads, then the UI is identical to the current shipments-only behavior (no visual or functional changes).
3. Existing tests for admin UI components continue to pass without modification (unless tests specifically cover the new gating logic).
4. No conditional rendering or feature-gating CSS is applied when the order mode is v1 or neither.
5. Explicit unit tests are added to the admin component tests (`apps/admin-component-tests`) that verify correct behavior for all three modes (Shipments, Order v1, Order v2) across the affected UI areas (order grid actions, shipment modal/box actions, settings visibility).

## Priority

**High** -- This FR directly supports BR-000001 success criterion 2: "No regression for v1 / no-mode users." A regression in the existing experience for the majority of webshop owners would be a critical defect.

## Technical Considerations

No Technical Requirements or Architectural Decision Records exist yet for this feature area. If decisions are made about how the gating logic ensures passthrough behavior for non-v2 modes (e.g., default-open vs. default-closed gating strategy), those should be captured as separate TR or ADR documents and referenced here.

## Dependencies

- [FR-000001 - Detect Account Order Mode from Application Config](FR-000001-detect-account-order-mode-from-application-config.md) -- the order mode detection composable must correctly identify v1 and shipments states.
- [FR-000002 - Gate Export and Print Actions When Order V2 Is Active](FR-000002-gate-export-print-actions-order-v2.md) -- the action gating logic must not affect v1 or shipments-mode accounts.
- [FR-000003 - Gate Settings Sections and Tabs When Order V2 Is Active](FR-000003-gate-settings-sections-and-tabs-when-order-v2-is-active.md) -- the settings gating logic must not affect v1 or shipments-mode accounts.

## Open Questions

- Is a visual regression testing approach (screenshot comparison) warranted for this safeguard requirement?
