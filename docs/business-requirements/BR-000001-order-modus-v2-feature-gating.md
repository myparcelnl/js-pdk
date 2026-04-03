# BR-000001 - Order Modus V2 Feature Gating

## Status

Draft

## Business Context

MyParcel is transitioning from Order v1 (push-based: the plugin pushes orders to the MyParcel API) to Order v2 (pull-based: the MyParcel API pulls data from the plugin). During this transition period, a webshop owner's account may be in one of three mutually exclusive states:

1. **Order v1 active** -- the current "order modus" behavior, where the plugin pushes shipments/orders to MyParcel.
2. **Order v2 active** -- the new pull-based model, where MyParcel retrieves data from the plugin.
3. **Neither active** -- no order mode; the webshop owner works with shipments only, this was the default behaviour and will not change.

The backend is responsible for retrieving the account state and making it available in the application configuration. The admin frontend receives this state as part of the existing config context that is passed into the Vue application. The exact property names in the config for the order mode flags are still to be determined.

## Business Need

When Order v2 is active on a webshop owner's account, the MyParcel API is responsible for pulling order and shipment data from the plugin. If the admin UI still allows the webshop owner to manually export shipments, print labels, or export orders (push-based actions), this results in duplicate data in the MyParcel API and backoffice. This duplication causes confusion for webshop owners and operational issues for MyParcel.

The admin UI must therefore gate access to push-based features based on the account's active order mode, ensuring that webshop owners cannot accidentally trigger actions that conflict with the pull-based Order v2 workflow.

## Objective

Prevent webshop owners with Order v2 active from accessing admin UI features that would cause duplicate shipments or orders in the MyParcel ecosystem, while preserving the full existing experience for webshop owners on Order v1 or with no order mode.

## Stakeholders

| Role | Party |
|---|---|
| Business Sponsor | MyParcel internal team |
| Product Owner | MyParcel internal team |
| End Users | Webshop owners using MyParcel plugins built with the JS PDK |

## Success Criteria

1. **No duplicate data**: Webshop owners with Order v2 active cannot access features that would create duplicate shipments or orders (export shipments, print labels, export orders).
2. **No regression for v1 / no-mode users**: Webshop owners with Order v1 active or with neither order mode active see no changes to their current experience.
3. **Reduced confusion**: Settings related to disabled functionality are hidden when Order v2 is active, so webshop owners are not presented with options that have no effect.
4. **Correct state detection**: The admin frontend correctly reads the account's order mode from the application config and applies the appropriate feature gating.

## Scope

### In Scope

- Frontend feature gating in the admin application (`apps/admin` in the js-pdk monorepo).
- Reading the order mode state from the existing application config context passed into the Vue app.
- Hiding or disabling push-based action UI elements (export, print labels, export orders) when Order v2 is active.
- Hiding settings tabs or sections that are irrelevant when Order v2 is active.
- Supporting all three account states (Order v1 active, Order v2 active, neither active).

### Out of Scope

- Backend or API changes (the `/whoami` endpoint, how the config is populated, or any other MyParcel API).
- Changes to the Order v2 pull-based mechanism itself.
- Migration tooling or workflows for transitioning accounts between order modes.
- Other apps in the js-pdk monorepo beyond `apps/admin`.

## Constraints

- The property names in the application config for the order mode flags are not yet finalized. The implementation must be adaptable to the final property names once they are confirmed.
- The three account states (v1, v2, neither) are mutually exclusive; the UI must handle exactly one active state at a time.
- No backend changes are permitted as part of this requirement.

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Config property names change after initial implementation | Medium | Low | Centralize the flag reading logic in a single composable/utility so renaming requires a one-line change. |
| Incomplete identification of all UI elements that need gating | Medium | High | Conduct a thorough audit of all push-based actions in the admin UI before implementation. Decompose into detailed Functional Requirements per UI area. |
| Webshop owners on Order v2 lose access to features they still need | Low | High | Validate the exact list of gated features with the MyParcel product team. Provide clear communication in the UI about why features are unavailable. |
| Config not yet available when UI renders | Low | Medium | The config is passed as context on app initialization, so this is unlikely. If it occurs, default to the most restrictive state (features hidden) until the account state is confirmed. |

## Decomposition

This Business Requirement will be decomposed into the following Functional Requirements (to be created):

- [FR-000001 - Detect Account Order Mode from Application Config](../functional-requirements/FR-000001-detect-account-order-mode-from-application-config.md) -- read and expose the order mode state from the existing Vue app config context.
- [FR-000002 - Gate Export and Print Actions When Order V2 Is Active](../functional-requirements/FR-000002-gate-export-print-actions-order-v2.md) -- hide or disable push-based action buttons and bulk actions.
- [FR-000003 - Gate Settings Sections and Tabs When Order V2 Is Active](../functional-requirements/FR-000003-gate-settings-sections-and-tabs-when-order-v2-is-active.md) -- hide settings tabs or sections that are irrelevant under Order v2.
- [FR-000004 - Preserve Existing Behavior for Order V1 and No-Mode Accounts](../functional-requirements/FR-000004-preserve-existing-behavior-for-order-v1-and-no-mode-accounts.md) -- ensure no regressions for non-v2 account states.
