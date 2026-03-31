# FR-000003 - Gate Settings Sections and Tabs When Order V2 Is Active

## Status

Draft

## Parent Requirement

[BR-000001 - Order Modus V2 Feature Gating](../business-requirements/BR-000001-order-modus-v2-feature-gating.md)

## Description

When Order v2 is active on a webshop owner's account, certain settings in the admin settings screen must be hidden because they relate to push-based functionality that no longer applies under the pull-based Order v2 model. This prevents webshop owners from seeing or configuring options that have no effect, reducing confusion.

## Functional Details

### "Order modus" setting removed

The "Order modus" setting in the Bestellingen > Algemeen section must be removed entirely (not hidden, but deleted from the UI). The order mode is now determined by the backend config/context, not by a user-facing setting.

### Bestellingen tab > Algemeen section -- per-setting visibility

The remaining settings in the "Algemeen" section have mode-dependent visibility:

| Setting | Shipments | Order v1 | Order v2 |
|---|---|---|---|
| Concept zendingen | visible | hidden | hidden |
| Klantadres opslaan in adresboek | visible | hidden | hidden |
| All other settings in Algemeen | visible | visible | hidden |

When all settings in the Algemeen section are hidden (i.e. Order v2), the entire section header should also be hidden.

### Tabs fully hidden when Order v2 is active

| Settings Tab | Scope | Behavior |
|---|---|---|
| Labels | Entire tab | Hidden when Order v2 is active. Visible in Shipments and Order v1. |
| Douane (Customs) | Entire tab | Hidden when Order v2 is active. Visible in Shipments and Order v1. |

### Tabs not affected

The following tabs remain visible regardless of the active order mode:

| Settings Tab | Behavior |
|---|---|
| Checkout | No changes -- always visible |
| Vervoerders (Carriers) | No changes -- always visible |

## Acceptance Criteria

1. **Given** any order mode, **when** a webshop owner opens the settings screen, **then** the "Order modus" setting is not present (removed, not hidden).
2. **Given** Shipments mode is active, **when** a webshop owner opens Bestellingen > Algemeen, **then** "Concept zendingen" and "Klantadres opslaan in adresboek" are visible, along with all other Algemeen settings.
3. **Given** Order v1 is active, **when** a webshop owner opens Bestellingen > Algemeen, **then** "Concept zendingen" and "Klantadres opslaan in adresboek" are hidden, but all other Algemeen settings remain visible.
4. **Given** Order v2 is active, **when** a webshop owner opens the settings screen, **then** the entire Algemeen section (including its header) within the Bestellingen tab is not visible.
5. **Given** Order v2 is active, **when** a webshop owner opens the settings screen, **then** the Labels tab is not visible.
6. **Given** Order v2 is active, **when** a webshop owner opens the settings screen, **then** the Douane tab is not visible.
7. **Given** Order v2 is active, **when** a webshop owner opens the settings screen, **then** the Checkout and Vervoerders tabs remain visible.
8. **Given** Order v2 is active, **when** a webshop owner opens the settings screen, **then** the remaining sections of the Bestellingen tab (outside Algemeen) are still visible.
9. **Given** Shipments or Order v1 is active, **when** a webshop owner opens the settings screen, **then** the Labels and Douane tabs are visible.
10. Unit tests cover the settings visibility rules for all three order modes, including per-setting visibility within the Algemeen section.

## Priority

**High** (MoSCoW: Must Have)

Settings that relate to push-based features (labels, customs, general order settings) would confuse webshop owners on Order v2 if left visible, since those features have no effect. Hiding them is essential for a coherent Order v2 experience and is identified as in-scope by the parent BR.

## Dependencies

- [FR-000001 - Detect Account Order Mode from Application Config](FR-000001-detect-account-order-mode-from-application-config.md) -- this FR depends on FR-000001 to provide the `OrderMode` enum value. The settings gating logic consumes the order mode to determine which tabs and sections to show or hide.

## Technical Considerations

No technical requirements or architectural decisions are referenced at this time. If performance or implementation constraints arise (e.g., settings rendering approach, conditional tab registration), the appropriate TR or ADR documents should be created and linked here.
