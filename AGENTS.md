# MyParcel JS-PDK

A monorepo of npm packages for building e-commerce plugins that integrate with the MyParcel shipping platform. Two main domains: **admin** (back-office UI built with Vue 3 + Pinia) and **checkout** (front-end checkout integration with MyParcel Delivery Options).

## MyParcel stack

This repository is one part of the MyParcel plugin stack:

| Repository | Role |
| --- | --- |
| [myparcelnl/sdk](https://github.com/myparcelnl/sdk) | PHP client generated from the MyParcel API OpenAPI spec. Source of carriers, delivery types, package types and API types. |
| [myparcelnl/pdk](https://github.com/myparcelnl/pdk) | PHP Plugin Development Kit. Business logic, models, settings, migrations and API calls shared by all plugins. |
| [myparcelnl/js-pdk](https://github.com/myparcelnl/js-pdk) **(this repository)** | JS Plugin Development Kit. Admin UI and checkout scripts that the plugins build on. |
| [myparcelnl/delivery-options](https://github.com/myparcelnl/delivery-options) | Checkout widget in which the consumer picks a delivery or pickup option. |
| [myparcelnl/woocommerce](https://github.com/myparcelnl/woocommerce) | WooCommerce plugin. Thin adapter on top of the PDK. |
| [myparcelnl/prestashop](https://github.com/myparcelnl/prestashop) | PrestaShop module. Thin adapter on top of the PDK. |

How they connect:

- A plugin bootstraps the PDK and implements the platform adapters (storage, hooks, rendering, cron). Behaviour that all plugins share goes in the PDK, not in one plugin.
- The PDK renders its context as JSON in an HTML attribute (`data-pdk-context` for the admin). The js-pdk apps read it and call PDK endpoint actions (registered in the PDK's `config/actions.php`) for more data.
- The delivery options widget is not bundled into the plugins. The PDK builds jsdelivr CDN URLs for `myparcel.js`, `myparcel.lib.js` and `style.css` (the PDK's `config/pdk-dependencies.php`), and the plugin loads them at runtime. In js-pdk, the `@myparcel-dev/delivery-options` npm dependency supplies only types and constants.
- The widget and the js-pdk admin get carrier capabilities by POSTing to the PDK `proxyCapabilities` action (`PdkCapabilitiesActions`).
- Carriers, delivery types and package types come from the SDK. Do not add definitions of them to the PDK or the plugins.

For local development, `pdk-dev-on` links local checkouts of the PDK and js-pdk into a plugin. It adds a composer `path` repository to `composer.json` and yarn `portal:` links to `package.json`. Never commit these changes. Suggest it only when the task needs changes in the PDK or js-pdk, or needs to test such changes in a plugin. MyParcel employees can find the setup in [Local PDK in PDK plugin](https://myparcelnl.atlassian.net/wiki/spaces/IG/pages/319422473).

The delivery options widget has no link command. To test a local build, serve `apps/delivery-options/dist` from a delivery-options checkout and override `deliveryOptionsCdnUrlJs`, `deliveryOptionsCdnUrlJsLib` and `deliveryOptionsCdnUrlCss` in the plugin's `config/pdk.php`. Never commit these overrides. This works only locally: there is no way to give a tester a plugin build with a custom widget version.

To find the local checkouts of the other repositories, read `.claude/int-branch.json` in a parent directory. Its `repos` list holds their paths. If there is none and the task needs another repository, tell the user once that the `int-branch` skill of the `external-integrations-basekit` plugin offers to write this file on its first run.

## MyParcel employees: agent plugin

If no skills from the `external-integrations-basekit` plugin are available in this session, tell the user once, at the start, that the plugin is missing and give these commands:

```
/plugin marketplace add mypadev/ai-plugins
/plugin install external-integrations-basekit@myparcel-claude-code-marketplace
```

The marketplace is private, so only MyParcel employees can install it.

## Admin components

Vue templates use `Pdk*` components (for example `PdkButton`) without importing them. The plugin passes the components in its admin config, usually from a `@myparcel-dev/pdk-admin-preset-*` package, and `createRegisterComponentsPlugin` registers them globally. A missing required component logs an error. A missing optional component falls back to the default that `getOptionalComponents` sets for its group. ESLint allows `Pdk*` as undefined components for this reason.

## Capabilities (runtime model)

Admin shipment/delivery-option forms resolve what a carrier supports at runtime via the PHP-PDK `ProxyCapabilities` endpoint, not from hardcoded carrier/option constants:

- Two queries: an **order-scoped** one (keyed on country + weight) drives the carrier / package-type / delivery-type dropdowns, and a **shipment-scoped** one (full selection) drives per-option metadata. Refetch is narrow and debounced — only `cc` / `carrier` / `packageType` / `deliveryType` / `weight` / `isBusiness` trigger it; option toggles resolve client-side.
- Shipment-option fields are data-driven: `createShipmentOptionField` renders any option from `carrier.options` as a TriState. Only options needing non-TriState UI get a custom factory (`fieldFactoryRegistry`, currently just `insurance`).
- When a server-confirmed invalid combination empties the results, conflicting options are auto-cleared and a notification is shown (`useCapabilitiesAutoClear`).
- **Order mode v2** is read from the PHP context (`effectiveOrderMode`, fallback `subscriptionFeatures`) and gates export/print actions and settings tabs.

## Future plans

We are creating plans for a major simplification of the JS-PDK. This is provided here as context not to do a major refactor now, but to ensure new features are added in a way that they can be easily migrated to the new structure when the time comes. The admin shipment-options area has already started down this path — per-carrier field factories were replaced by capabilities-driven generic rendering (see "Capabilities (runtime model)" above). The main goals of the refactor are:

- Simplify the codebase by removing unnecessary abstractions and layers.
- Improve maintainability and readability of the code.
- Reducing the complexity of the monorepo, removing anything that is not needed or not related to UI components.
- The repository should not define types and logic for specific carriers, their shipment options, etc.
- Types should be based off of the OpenAPI specification for the MyParcel API, rather than defining in constants and manually maintaining them.
- The goal for the above two points is to allow the JS-PDK to work with any new carrier, delivery type or shipment option at most needing a regeneration of the OpenApi-based types, but no manual code change
- The JS-PDK should mostly react to the context given to it by the PHP PDK / plugin and use OpenAPI types for type-safety.
