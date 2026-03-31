# FR-000002 - Gate Export and Print Actions When Order V2 Is Active

## Status

Draft

## Parent Requirement

[BR-000001 - Order Modus V2 Feature Gating](../business-requirements/BR-000001-order-modus-v2-feature-gating.md)

## Description

When Order v2 is active on a webshop owner's account, push-based actions in the admin UI must be hidden to prevent duplicate data in the MyParcel ecosystem. This applies to the order grid and the shipment modal.

The system must evaluate the account's active order mode and conditionally render action buttons accordingly. When Order v2 is active, export and print actions are suppressed. When Order v1 is active or neither mode is active, all action buttons remain visible without any change to current behavior.

## Functional Details

The admin UI currently shows different action buttons depending on whether order mode (v1) is active or not. Order v2 introduces a third state where push-based actions must be fully suppressed.

### Action buttons per mode

#### Shipments mode (no order mode active) -- unchanged

- Order grid: Export to shipments, Print, Export & Print
- Shipment options box: Export to shipments, Print, Export & Print, Edit/Save

#### Order v1 (current order mode) -- unchanged

- Order grid: Export order, Edit
- Shipment options box (not yet exported): Export order, Edit/Save
- Shipment options box (already exported): "Toon in backoffice" (View in backoffice) link

#### Order v2 (new) -- push-based actions removed

- Order grid: Edit only (no Export, no Print, no Export & Print)
- Shipment options box: Edit/Save only (no Export, no Print, no "Toon in backoffice")
- The "exported" state and its associated "Toon in backoffice" link do not apply in Order v2

### Shipment Modal

When Order v2 is active, export and print actions within the shipment options modal must be hidden. Only the following actions remain available:

- **Sluiten** (Close)
- **Opslaan** (Save/Update)

When Order v1 or Shipments mode is active, the modal actions remain as they are today.

## Acceptance Criteria

1. **Given** Order v2 is active, **when** a webshop owner views the order grid, **then** only the Edit action is available; Export, Print, and Export & Print buttons are not visible.
2. **Given** Order v2 is active, **when** a webshop owner views the shipment options box, **then** only Edit/Save is available; Export and Print actions are hidden, and the "Toon in backoffice" link is not shown.
3. **Given** Order v2 is active, **when** a webshop owner opens the shipment options modal, **then** only Close and Save actions are available; Export actions are hidden.
4. **Given** Order v1 is active, **when** a webshop owner views the shipment options box (order grid or detail), **then** Export order and Edit are available (current behavior preserved).
5. **Given** Order v1 is active and an order is already exported, **when** a webshop owner views the shipment options box (order grid or modal), **then** the "Toon in backoffice" link is shown (current behavior preserved).
6. **Given** Shipments mode is active (neither order mode), **when** a webshop owner views the order grid or shipment options, **then** all current shipment actions are available (Export to shipments, Print, Export & Print -- current behavior preserved).
7. Unit tests cover the action visibility for all three order modes across the order grid, shipment options box, and shipment options modal.

## Priority

**High** (MoSCoW: Must Have)

This is a Must Have because allowing push-based actions while Order v2 is active directly causes duplicate data in the MyParcel API, which is the core problem BR-000001 aims to solve. Without this FR, the business objective of preventing duplicate shipments and orders cannot be met.

## Dependencies

- [FR-000001 - Detect Account Order Mode from Application Config](FR-000001-detect-account-order-mode-from-application-config.md) -- this FR depends on FR-000001 to provide the `OrderMode` enum value. The gating logic consumes the order mode to determine which actions to show or hide.

## Technical Considerations

No Technical Requirements or Architectural Decision Records exist yet for this project. When the following are created, they should be referenced here:

- A TR for any performance constraints related to conditional rendering of UI elements.
- An ADR if a decision is made on the mechanism for feature gating (e.g., directive-based vs. composable-based conditional rendering).

## Scope Boundaries

### This FR Covers

- Hiding export and print action buttons in the order grid when Order v2 is active.
- Hiding export and print actions in the shipment modal when Order v2 is active.
- Preserving all existing behavior when Order v1 is active or neither mode is active.

### This FR Does Not Cover

- Detection of the account order mode (covered by FR-000001).
- Gating of settings sections or tabs (separate FR per BR-000001 decomposition).
- Any backend or API changes.
- Any UI changes beyond the order grid action buttons and shipment modal actions.
