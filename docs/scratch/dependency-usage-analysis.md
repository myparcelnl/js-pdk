# Dependency usage analysis — js-pdk monorepo

Analysis of direct `dependencies` / `devDependencies` / `peerDependencies` for every package
(18 packages + root). For each dep: what it's used for, and whether it has real functional use,
only technical (build/test/type) use, or no use at all.

Method: for each package, every declared dep was grepped across `src/**`, `vite.config.*` /
`vitest.config.*`, `tsconfig*`, `.eslintrc*`, `project.json`, and the package's own `scripts`.
"Evidence" cites a concrete `file:line` or "no refs found".

Classification legend:
- **FUNCTIONAL** — imported in src, part of runtime/shipped behavior
- **BUILD/TOOLING** — only used by build/lint/format/config
- **TEST-ONLY** — only referenced in `*.spec.ts` / test setup
- **TYPE-ONLY** — only used in type positions (`import type`)
- **PEER** — peer dependency
- **UNUSED** — no reference found anywhere (removal candidate)
- **REDUNDANT** — declared here but also provided by root / a workspace dep, or duplicated

---

## TL;DR — action list

### 1. Genuinely unused — safe to remove
| Package | Dependency | Where | Note |
|---|---|---|---|
| root | `array.prototype.flatmap` | devDep | only native `.flatMap()` used; Node >=24, polyfill is dead weight |
| root | `nodemon` | devDep | no config/script/CI/source ref; `serve` points at a `watch` script that doesn't exist |
| apps/backend-demo | `@apollo/server` | devDep | abandoned GraphQL path, no refs |
| apps/backend-demo | `graphql` | devDep | peer of the unused apollo server |
| apps/backend-demo | `serverless` | devDep | no `serverless.yml`; replaced by Nitro Netlify preset |
| apps/backend-demo | `serverless-plugin-typescript` | devDep | same — no serverless config |
| apps/backend-demo | `vitest` | devDep | no spec files, no vitest config, no `test` script |
| apps/app-builder | `@yarnpkg/parsers` | dep | no refs |
| apps/app-builder | `inquirer` | dep | no refs |
| apps/app-builder | `@types/inquirer` | devDep | types for the unused `inquirer` |
| apps/app-builder | `semver` | dep | import removed per CHANGELOG, dep left behind |
| apps/app-builder | `supports-color` | dep | no refs |
| apps/checkout | `@myparcel-dev/pdk-common` | dep | no import anywhere in the package |
| libs/common | `vue` | devDep | no `.vue` / `from 'vue'` anywhere in src |
| apps/admin-preset-bootstrap4 | `pinia` | devDep | no refs; already supplied transitively by pdk-admin |

### 2. Duplicate declarations (same dep listed twice → remove one)
| Package | Dependency | Problem |
|---|---|---|
| apps/admin | `vite` | in both `dependencies` and `devDependencies` — drop the `dependencies` copy |
| libs/build-vite | `typescript` | in both `dependencies` and `devDependencies` |
| libs/checkout-common | `typescript` | in both `dependencies` and `devDependencies` (also runtime dep on tsc is wrong) |
| apps/admin-preset-dashicons | `vue-tsc` | listed under both `dependencies` and `devDependencies` |
| apps/admin-component-tests | `vitest` | listed under both `dependencies` and `devDependencies` |

### 3. Redundant — provided by root / a workspace dep / self-typed
| Package | Dependency | Provided by |
|---|---|---|
| libs/build-vite | `vue` | only a rollup external-global string, never imported; consumers + root resolution supply vue |
| libs/build-vite | `vue-tsc` | not used by build-vite at all; consumers declare their own |
| apps/app-builder | `@types/commander` | `commander` ships its own types (stub package) |
| apps/admin-component-tests | `@vitest/coverage-v8` | already provided by build-vite |
| apps/admin-component-tests | `happy-dom` | already provided by build-vite |
| apps/admin-component-tests | `pinia` | already supplied by pdk-admin |
| apps/checkout-js | `typescript` | no direct use; `.d.ts` come from vite-plugin-dts via build-vite; also root |
| (many) | `typescript` | also at root `^5.2.2` — per-package pinning looks deliberate, flagged not urgent |

### 4. Misplaced — build tools sitting in `dependencies` (should be `devDependencies`)
| Package | Dependency |
|---|---|
| apps/admin | `vite` (also duplicated), `vue-tsc` |
| apps/admin-preset-dashicons | `vite`, `vue-tsc` |
| apps/admin-preset-fontawesome | `vite`, `vue-tsc` |
| apps/admin-demo | `tailwindcss` (build-only, only used by the PostCSS pipeline) |

### 5. Misclassified the other way (should be a runtime dependency, not devDep/type-only)
| Package | Dependency | Note |
|---|---|---|
| libs/checkout-common | `radash` | currently devDep, but ships via the public `tests` export → move to `dependencies` |
| libs/checkout-tax-fields | `@myparcel-dev/constants` | declared as runtime `dependency` but only used as a type → could move to devDeps |

### 6. Technical use, no functional use (mostly legitimate — not removal candidates)
These are the "technical but no functional use" deps the question asked about. In almost every case
they are correct and expected: shared build/test tooling (`vite`, `vitest`, `vue-tsc`, `typescript`,
`@myparcel-dev/pdk-build-vite`, `@vitejs/plugin-vue`) and `@types/*` packages. They ship no runtime
behavior but are needed to build/test/type the package. See per-package tables for the full list.

### 7. Phantom deps — the opposite problem (imported but NOT declared)
Not part of the ask, but surfaced repeatedly and worth a follow-up: several packages import things
they don't declare, working only via Yarn hoisting (fragile). Notably:
- `@vitejs/plugin-vue` — imported in every preset's + admin's + component-tests' `vitest.config.ts`, declared in none (hoisted from build-vite).
- `@myparcel-dev/delivery-options` — re-exported at `apps/checkout` `src/index.ts:48` but not declared.
- `@myparcel-dev/sdk` — imported in `libs/common/src/types/endpoints.types.ts:1`, not declared.
- `@myparcel-dev/ts-utils` — used in `checkout-common`, `checkout-separate-address-fields`, admin-js config; not declared there.
- `@myparcel-dev/constants` + `@myparcel-dev/pdk-common` — used in `checkout-delivery-options` src, not declared.
- admin-js `vite.config.ts`: `is-ci`, `@vue/compiler-core`, `@codecov/vite-plugin` — none declared.

### 8. Structural note
- **libs/backend** is not an npm package — it contains only `tsconfig.base.json` (`{"extends": "../tsconfig.base.json"}`). No `package.json`, no `src/`, no sub-packages. The CLAUDE.md "backend sub-modules" description doesn't match the current tree. Consider removing if unused.

---

## Per-package detail

### apps/admin (@myparcel-dev/pdk-admin)
Core admin library: Vue 3 + Pinia + TanStack Query back-office UI (shipment/order/settings forms, capabilities-driven fields).

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/constants | dep | FUNCTIONAL | `src/composables/components/useShippingMethodsInputContext.ts:4` (`PackageTypeName`) | keep |
| @myparcel-dev/pdk-common | dep | FUNCTIONAL | 138 hits across src | keep |
| @myparcel-dev/sdk | dep | FUNCTIONAL | `src/sdk/composables/usePdkAdminApi.ts:2` (`createMyParcelSdk`) | keep |
| @myparcel-dev/vue-form-builder | dep | FUNCTIONAL | 64 hits across src (forms) | keep |
| @tanstack/vue-query | dep | FUNCTIONAL | `src/sdk/composables/api/useFetchCarrier.ts:2` | keep |
| @vueuse/core | dep | FUNCTIONAL | `src/composables/language/useLanguage.ts:2` | keep |
| lodash | dep | REDUNDANT (peer-satisfying) | no direct import; satisfies `lodash-unified` peer | keep |
| lodash-es | dep | REDUNDANT (peer-satisfying) | no direct import; satisfies `lodash-unified` peer | keep |
| lodash-unified | dep | FUNCTIONAL | `src/composables/language/resolveTranslatedString.ts:1` (`get`) | keep |
| pinia | dep | FUNCTIONAL | `src/stores/useActionStore.ts:2` | keep |
| vite | dep | BUILD/TOOLING + REDUNDANT | no `from 'vite'` in src; also in devDeps; provided by build-vite | **remove from `dependencies`** |
| vue | dep | FUNCTIONAL | 130 `from 'vue'` imports | keep |
| vue-tsc | dep | BUILD/TOOLING | only run by `typecheck` script | **move to devDeps** |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:2` | keep |
| @types/lodash-es | dev | TYPE-ONLY (peer-satisfying) | satisfies lodash-unified peer types | keep |
| @vue/test-utils | dev | TEST-ONLY | `src/composables/language/useLanguage.spec.ts:4` | keep |
| typescript | dev | BUILD/TOOLING + REDUNDANT | also root `^5.2.2` | keep or drop (root provides) |
| vite | dev | BUILD/TOOLING | via createViteConfig | keep this copy |
| vitest | dev | TEST-ONLY | `src/composables/useLoading.spec.ts:1` | keep |

Phantom (used in `vitest.config.ts`, not declared): `@vitejs/plugin-vue`, `@myparcel-dev/pdk-admin-component-tests/setup`.

### apps/admin-js (@myparcel-dev/pdk-admin-js)
Bundled admin entry point; re-exports `@myparcel-dev/pdk-admin`. Vite library build.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `src/index.ts:1`, `src/testing.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vite.config.ts:4` | keep |
| typescript | dev | BUILD/TOOLING | drives `vite build`/dts | keep |
| vite | dev | BUILD/TOOLING | build script `vite build` | keep |
| vitest | dev | TEST-ONLY | `src/__tests__/exports.spec.ts:1` | keep |
| vue | peer | PEER | externalized runtime; pinned 3.4.31 | keep |

Phantom (used in `vite.config.ts`, not declared): `is-ci`, `@vue/compiler-core`, `@vitejs/plugin-vue`, `@myparcel-dev/ts-utils`, `@codecov/vite-plugin`.

### apps/admin-preset-bootstrap4 (@myparcel-dev/pdk-admin-preset-bootstrap4)
Bootstrap 4 UI preset; maps pdk-admin component contracts to Bootstrap markup + jQuery-modal glue.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `src/bootstrap4Config.ts:4`, components/* | keep |
| @myparcel-dev/ts-utils | dep | FUNCTIONAL | `Bootstrap4Notification.vue:28` | keep |
| vue | dep | FUNCTIONAL | `Bootstrap4Modal.vue:48` | keep |
| @myparcel-dev/pdk-admin-component-tests | dev | TEST-ONLY | `testComponents.spec.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:2` | keep |
| @types/bootstrap | dev | TYPE-ONLY | `bootstrap4Config.ts:2` (`/// <reference>`) | keep |
| @types/jquery | dev | TYPE-ONLY | `bootstrap4Config.ts:1` | keep |
| pinia | dev | **UNUSED / REDUNDANT** | no refs; supplied by pdk-admin | **drop** |
| typescript | dev | BUILD/TOOLING | drives vue-tsc | keep |
| vite | dev | BUILD/TOOLING | backs vitest via build-vite | keep |
| vitest | dev | TEST-ONLY | `exports.spec.ts:1` | keep |
| vue-tsc | dev | BUILD/TOOLING | build/typecheck scripts | keep |

Phantom: `@vitejs/plugin-vue` (`vitest.config.ts:1`).

### apps/admin-preset-dashicons (@myparcel-dev/pdk-admin-preset-dashicons)
WordPress Dashicons preset; single icon component + name converter.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `convertToDashIcon.ts:2`, `DashIconsIcon.vue:12` | keep |
| vite | dep | BUILD/TOOLING (misplaced) | backs vitest via build-vite | **move to devDeps** |
| vue | dep | FUNCTIONAL | `DashIconsIcon.vue:11` | keep |
| vue-tsc | dep | BUILD/TOOLING (misplaced + duplicate) | build/typecheck; also in devDeps | **move to dev + de-dupe** |
| @myparcel-dev/pdk-admin-component-tests | dev | TEST-ONLY | `testComponents.spec.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:2` | keep |
| typescript | dev | BUILD/TOOLING | drives vue-tsc | keep |
| vitest | dev | TEST-ONLY | `exports.spec.ts` | keep |
| vue-tsc | dev | REDUNDANT | duplicate of dependencies entry | **remove one** |

Phantom: `@vitejs/plugin-vue` (`vitest.config.ts:1`).

### apps/admin-preset-fontawesome (@myparcel-dev/pdk-admin-preset-fontawesome)
Font Awesome preset; single icon component + name converter.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `convertToFontAwesomeIcon.ts:2` | keep |
| vite | dep | BUILD/TOOLING (misplaced) | backs vitest via build-vite | **move to devDeps** |
| vue | dep | FUNCTIONAL | `FontAwesomeIcon.vue:10` | keep |
| vue-tsc | dep | BUILD/TOOLING (misplaced) | build/typecheck scripts | **move to devDeps** |
| @myparcel-dev/pdk-admin-component-tests | dev | TEST-ONLY | `testComponents.spec.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:2` | keep |
| typescript | dev | BUILD/TOOLING | drives vue-tsc | keep |
| vitest | dev | TEST-ONLY | `exports.spec.ts` | keep |

Phantom: `@vitejs/plugin-vue` (`vitest.config.ts:1`).

### apps/admin-preset-default (@myparcel-dev/pdk-admin-preset-default)
Reference/default UI preset; largest set of Vue input/layout components. Cleanest preset package.json.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `DefaultRadioInput.vue:37` | keep |
| @myparcel-dev/ts-utils | dep | FUNCTIONAL | `DefaultNotification.vue:23` | keep |
| @vuepic/vue-datepicker | dep | FUNCTIONAL | `DefaultMultiDateInput.vue:14` | keep |
| @vueuse/core | dep | FUNCTIONAL | `DefaultCurrencyInput.vue:10` (useVModel) | keep |
| vue | dep | FUNCTIONAL | `DefaultModal.vue:49` | keep |
| @myparcel-dev/pdk-admin-component-tests | dev | TEST-ONLY | `testComponents.spec.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:2` | keep |
| typescript | dev | BUILD/TOOLING | drives vue-tsc | keep |
| vite | dev | BUILD/TOOLING | backs vitest via build-vite | keep |
| vitest | dev | TEST-ONLY | `exports.spec.ts` | keep |
| vue-tsc | dev | BUILD/TOOLING | build/typecheck scripts | keep |

Phantom: `@vitejs/plugin-vue` (`vitest.config.ts:1`). No unused deps.

### apps/admin-component-tests (@myparcel-dev/pdk-admin-component-tests)
Shared test-utility library consumed by presets. Test frameworks are its *functional* deps (shipped as `dependencies` so preset consumers inherit them).

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `index.ts:1`, `TestSuite.ts:6` | keep |
| @pinia/testing | dep | FUNCTIONAL (indirect) | no direct import; `doComponentTestSetup` (pdk-admin/testing) uses `createTestingPinia`; pdk-admin doesn't declare it | keep (brittle indirect provider — verify) |
| @vitest/coverage-v8 | dep | REDUNDANT | no refs; also provided by build-vite | drop |
| @vue/test-utils | dep | FUNCTIONAL | `setup.ts:1`, `wrapperPlugin.ts:1` | keep |
| happy-dom | dep | REDUNDANT | no refs; env set in build-vite | consider drop |
| pinia | dep | REDUNDANT | no refs; supplied by pdk-admin | consider drop |
| vitest | dep | FUNCTIONAL | `TestSuite.ts`, `executeAdminComponentTest.ts:3` (shipped helpers) | keep |
| typescript | dev | BUILD/TOOLING | drives vue-tsc | keep |
| vitest | dev | REDUNDANT | duplicate of dependencies entry | **remove one** |
| vue | dev | BUILD/TOOLING | `types.ts:1`, `TestSuite.ts:2` | keep |
| vue-tsc | dev | BUILD/TOOLING | build/typecheck scripts | keep |
| vue | peer | PEER | consumer-provided runtime | keep |

### apps/admin-demo (@myparcel-dev/pdk-admin-demo)
Vite + Vue 3 demo app for developing the admin library. Has its own `vite.config.ts` (not the shared factory).

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @fortawesome/fontawesome-free | dep | FUNCTIONAL | `src/assets/css/icons.css:1` | keep |
| @myparcel-dev/constants | dep | FUNCTIONAL | `useDemoProductData.ts:2` | keep |
| @myparcel-dev/pdk-admin | dep | FUNCTIONAL | `src/main.ts:36` + ~18 files | keep (the lib under demo) |
| @myparcel-dev/pdk-admin-preset-default | dep | FUNCTIONAL | `src/main.ts:29` | keep |
| @myparcel-dev/pdk-admin-preset-fontawesome | dep | FUNCTIONAL | `src/main.ts:8` | keep |
| @myparcel-dev/ts-utils | dep | FUNCTIONAL | `DemoNotification.vue:48` (toArray) | keep |
| @tanstack/vue-query | dep | FUNCTIONAL | `patchQueryData.ts:1` | keep |
| tailwindcss | dep | BUILD/TOOLING | `postcss.config.cjs:3`, `tailwind.config.cjs:1` | **move to devDeps** |
| vue | dep | FUNCTIONAL | 11 files; externalized | keep (note: declares 3.5.40, root pins 3.4.31) |
| vue-router | dep | FUNCTIONAL | `router.ts:1` | keep |
| @vitejs/plugin-vue | dev | BUILD/TOOLING | `vite.config.ts:4,12` | keep |
| autoprefixer | dev | BUILD/TOOLING | `postcss.config.cjs:4` | keep |
| postcss | dev | BUILD/TOOLING | `postcss.config.cjs` | keep |
| rollup-plugin-visualizer | dev | BUILD/TOOLING | `vite.config.ts:3,22` | keep |
| typescript | dev | REDUNDANT | also root `^5.2.2` | can drop (root provides) |
| vite | dev | BUILD/TOOLING | `vite.config.ts:2`; build/serve scripts | keep |
| vite-plugin-custom-tsconfig | dev | BUILD/TOOLING | `vite.config.ts:1,12` | keep |
| vitest | dev | TEST-ONLY | `vite.config.ts:31-38` test block | keep |

Phantom (used but not declared): `@myparcel-dev/pdk-admin-component-tests` (setupFiles + spec), `@myparcel-dev/vue-form-builder` (optimizeDeps.exclude).

### apps/backend-demo (@myparcel-dev/pdk-backend-demo)
Nitro-based backend demo server (Netlify preset). No test files, no `test` script.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @apollo/server | dev | **UNUSED** | no refs, no GraphQL schema | **remove** |
| @myparcel-dev/pdk-app-builder | dev | BUILD/TOOLING | `pdk.config.js:1`; translations scripts | keep |
| @myparcel-dev/pdk-common | dev | FUNCTIONAL | `routes/pdk/index.ts:2` (`BackendEndpoint`) | keep |
| @myparcel-dev/ts-utils | dev | FUNCTIONAL | `getItemsByParameter.ts:3` (toArray) | keep |
| @types/node | dev | TYPE-ONLY | `process`/`fs`/`path` types | keep |
| graphql | dev | **UNUSED** | no refs (peer of unused apollo) | **remove** |
| h3 | dev | TYPE-ONLY | only `import {type H3Event}`; runtime via nitropack auto-imports | keep (or rely on nitropack) |
| nitropack | dev | FUNCTIONAL | `nitro.config.ts:1`; build scripts; auto-imported globals | keep (core framework) |
| serverless | dev | **UNUSED** | no `serverless.yml` | **remove** |
| serverless-plugin-typescript | dev | **UNUSED** | no `serverless.yml` | **remove** |
| typescript | dev | REDUNDANT | also root `^5.2.2` | can drop (root provides) |
| vitest | dev | **UNUSED** | no spec, no vitest config, no `test` script | **remove** |

### apps/checkout (@myparcel-dev/pdk-checkout)
Core checkout library; `src/index.ts` only re-exports/aggregates the `checkout-*` libs.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-checkout-common | dep | FUNCTIONAL | `src/index.ts:1-14,22-39` | keep |
| @myparcel-dev/pdk-checkout-delivery-options | dep | FUNCTIONAL | `src/index.ts:16` | keep |
| @myparcel-dev/pdk-checkout-separate-address-fields | dep | FUNCTIONAL | `src/index.ts:18` | keep |
| @myparcel-dev/pdk-checkout-tax-fields | dep | FUNCTIONAL | `src/index.ts:20` | keep |
| @myparcel-dev/pdk-common | dep | **UNUSED** | no refs found | **remove** (or confirm kept for transitive types) |
| typescript | dev | BUILD/TOOLING | scripts run tsc | keep |
| vitest | dev | TEST-ONLY | `src/__tests__/exports.spec.ts:1` | keep |

Phantom: `@myparcel-dev/delivery-options` (re-exported at `src/index.ts:48`, not declared), `@myparcel-dev/pdk-build-vite` (`vitest.config.ts:1`, not declared).

### apps/checkout-js (@myparcel-dev/pdk-checkout-js)
Bundled checkout entry point; single `export *` from `@myparcel-dev/pdk-checkout`. Vite library build.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-checkout | dep | FUNCTIONAL | `src/index.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vite.config.ts:2` | keep |
| typescript | dev | REDUNDANT | no direct use; dts via vite-plugin-dts + root | **remove** (provided transitively) |
| vite | dev | BUILD/TOOLING | build script `vite build` | keep |
| vitest | dev | TEST-ONLY | `src/__tests__/exports.spec.ts:1` | keep |

Phantom: `@codecov/vite-plugin` (`vite.config.ts:3`), `is-ci` (`vite.config.ts:1`).

### libs/checkout-common (@myparcel-dev/pdk-checkout-common)
Core checkout: store, config, globals, request utils. Mock/test helpers are re-exported publicly as `tests` (`src/index.ts:1`), so deps used in `__tests__/` ship as public API.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/constants | dep | FUNCTIONAL | `__tests__/getMockDeliveryOptionsConfig.ts:9` (shipped via `tests`) | keep |
| @myparcel-dev/delivery-options | dep | FUNCTIONAL | `__tests__/getMockCheckoutContext.ts:3` (via `tests`) | keep (version `^6.25.0` drifts from `^7.0.0`) |
| @myparcel-dev/pdk-common | dep | FUNCTIONAL | `utils/global/doRequest.ts:1` | keep |
| typescript | dep + dev | REDUNDANT | declared in BOTH dep and devDep | **remove from `dependencies`** |
| radash | dev | FUNCTIONAL (misdeclared) | `__tests__/getMockDeliveryOptionsConfig.ts:2` (ships via `tests`) | **move to `dependencies`** |
| vitest | dev | TEST-ONLY | `src/**/*.spec.ts:1` | keep |

Phantom: `@myparcel-dev/ts-utils` (`init/setupGlobals.ts:2` + more), `@myparcel-dev/pdk-build-vite` (`vitest.config.ts:1`).

### libs/checkout-delivery-options (@myparcel-dev/pdk-checkout-delivery-options)
Wires the delivery-options widget into the checkout store; consumes the widget's event-name constants/types (widget loads from CDN).

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/delivery-options | dep | FUNCTIONAL | `initializeCheckoutDeliveryOptions.ts:4` (constants/types) | keep |
| @myparcel-dev/pdk-checkout-common | dep | FUNCTIONAL | `store/createDeliveryOptionsStore.ts:1` | keep |
| @myparcel-dev/ts-utils | dep | FUNCTIONAL | `listeners/updateDeliveryOptions.ts:9` (objectIsEqual) | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:1` | keep |
| typescript | dev | BUILD/TOOLING | tsc scripts; also root | keep (or drop) |
| vitest | dev | TEST-ONLY | `src/**/*.spec.ts:1` | keep |

Phantom: `@myparcel-dev/constants` (`utils/getPackageTypeFromShippingMethod.ts:3`), `@myparcel-dev/pdk-common` (`utils/fetchCheckoutContext.ts:1`).

### libs/checkout-separate-address-fields (@myparcel-dev/pdk-checkout-separate-address-fields)
Splits/joins separate street/number address fields in the checkout form.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/pdk-checkout-common | dep | FUNCTIONAL | `src/index.ts:3`, `utils/splitAddress.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:1` | keep |
| typescript | dev | BUILD/TOOLING | tsc scripts; also root | keep (or drop) |
| vitest | dev | TEST-ONLY | `__tests__/exports.spec.ts:1` | keep |

Phantom: `@myparcel-dev/ts-utils` (`listeners/fillSeparateAddressFields.ts:1`).

### libs/checkout-tax-fields (@myparcel-dev/pdk-checkout-tax-fields)
Shows/hides tax (EORI/VAT) fields based on carrier settings. Smallest of the four.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/constants | dep | TYPE-ONLY | `utils/hasTaxFields.ts:2` (`import {type CarrierName}`, erased at build) | **move to devDeps** (no runtime value use) |
| @myparcel-dev/pdk-checkout-common | dep | FUNCTIONAL | `src/index.ts:1`, `utils/toggleTaxFields.ts:1` | keep |
| @myparcel-dev/pdk-build-vite | dev | BUILD/TOOLING | `vitest.config.ts:1` | keep |
| typescript | dev | BUILD/TOOLING | tsc scripts; also root | keep (or drop) |
| vitest | dev | TEST-ONLY | `__tests__/exports.spec.ts:1` | keep |

### apps/app-builder (@myparcel-dev/pdk-app-builder)
CLI build tool (`pdk-builder`) bundled with tsup; being a build tool, its bundler/build deps are functional.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/ts-utils | dep | FUNCTIONAL | `src/run.ts:3` (+ ~15 files) | keep |
| @yarnpkg/parsers | dep | **UNUSED** | no refs | **remove** |
| chalk | dep | FUNCTIONAL | `utils/command/createDebugger.ts:2` | keep |
| commander | dep | FUNCTIONAL | `src/run.ts:2` | keep |
| debug | dep | FUNCTIONAL | `utils/command/createDebugger.ts:1` | keep |
| inquirer | dep | **UNUSED** | no refs | **remove** |
| interpret | dep | FUNCTIONAL | `src/start.ts:2` | keep |
| liftoff | dep | FUNCTIONAL | `src/start.ts:1` | keep |
| mypa-google-docs-importer | dep | FUNCTIONAL | `commands/translations/importSheets.ts:1` | keep |
| radash | dep | FUNCTIONAL | `utils/resolveStrings.ts:1` | keep |
| semver | dep | **UNUSED** | no refs (removed per CHANGELOG:295) | **remove** |
| supports-color | dep | **UNUSED** | no refs | **remove** |
| @types/commander | dev | REDUNDANT | commander self-types (stub package) | **remove** |
| @types/debug | dev | TYPE-ONLY | debug has no bundled types | keep |
| @types/inquirer | dev | **UNUSED** | types for unused inquirer | **remove** |
| @types/interpret | dev | TYPE-ONLY | interpret has no bundled types | keep |
| @types/liftoff | dev | TYPE-ONLY | liftoff has no bundled types | keep |
| tsup | dev | BUILD/TOOLING | `tsup.config.ts:1`; build script | keep |
| typescript | dev | BUILD/TOOLING | build/typecheck | keep |
| vitest | dev | TEST-ONLY | `utils/resolveStrings.spec.ts:1` | keep |

### libs/build-vite (@myparcel-dev/pdk-build-vite)
Shared Vite/Vitest config factory (`createViteConfig`). Tooling it declares is functional because its job is to hand tooling to consumers. Several are handed to consumers via hoisting, not imported by the factory itself.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @codecov/vite-plugin | dep | FUNCTIONAL (via hoisting) | consumers import it (admin-js/checkout-js) without declaring | keep (or have consumers declare) |
| @vitejs/plugin-vue | dep | FUNCTIONAL (via hoisting) | consumers import it (admin + presets) without declaring | keep |
| @vitest/coverage-v8 | dep | FUNCTIONAL (tooling) | coverage provider; version `^2.1.3` vs vitest `^3.2.6` | **bump to v3 to match vitest** |
| happy-dom | dep | FUNCTIONAL (tooling) | `index.js:36` | keep |
| typescript | dep | FUNCTIONAL — duplicated | declared as BOTH dep and devDep | **drop one** |
| vite | dep | FUNCTIONAL | `index.js:3` (mergeConfig) | keep |
| vite-plugin-custom-tsconfig | dep | FUNCTIONAL | `index.js:2` | keep |
| vite-plugin-dts | dep | FUNCTIONAL | `index.js:1` | keep |
| vitest | dep | FUNCTIONAL | `index.js:5`, `index.d.ts:1-2` | keep |
| vue | dep | REDUNDANT | only a rollup external-global string `{vue:'Vue'}`, never imported | **drop** |
| vue-tsc | dep | REDUNDANT | not used here; consumers declare their own | **drop** |
| @myparcel-dev/ts-utils | dev | TYPE-ONLY | `index.d.ts:3` | keep |

### libs/common (@myparcel-dev/pdk-common)
Shared types + static data across admin and checkout; almost entirely type/data, no Vue code.

| Dependency | dep/dev/peer | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @myparcel-dev/constants | dep | TYPE-ONLY | `types/php-pdk.types.ts:7` | keep (needed for published `.d.ts`) |
| @myparcel-dev/delivery-options | dep | TYPE-ONLY | `types/php-pdk.types.ts:6` (2 type names only) | keep, but heavy runtime dep for two types |
| typescript | dev | BUILD/TOOLING | build/emit/typecheck scripts | keep |
| vitest | dev | TEST-ONLY | `__tests__/exports.spec.ts:1` | keep |
| vue | dev | **UNUSED** | no refs found | **remove** |

Phantom: `@myparcel-dev/sdk` (`types/endpoints.types.ts:1`, not declared).

### libs/backend
Not an npm package — contains only `tsconfig.base.json` (`{"extends": "../tsconfig.base.json"}`). No `package.json`, no `src/`, no sub-packages. Empty stub; consider removing.

### root (@myparcel-dev/pdk-monorepo)
Shared workspace tooling only (24 devDeps, no dependencies/peerDependencies).

| Dependency | dep/dev | Classification | Evidence | Recommendation |
|---|---|---|---|---|
| @edielemoine/monodeploy-plugin-github-actions | dev | BUILD/TOOLING | `monoweave.config.cjs:14` | keep |
| @monoweave/cli | dev | BUILD/TOOLING | `.github/workflows/release.yml:54` | keep |
| @monoweave/plugin-github | dev | BUILD/TOOLING | `monoweave.config.cjs:14` | keep |
| @myparcel-dev/eslint-config-esnext | dev | BUILD/TOOLING | `.eslintrc.cjs:49` | keep |
| @myparcel-dev/eslint-config-import | dev | BUILD/TOOLING | `.eslintrc.cjs:12,32,50` | keep |
| @myparcel-dev/eslint-config-node | dev | BUILD/TOOLING | `.eslintrc.cjs:48` | keep |
| @myparcel-dev/eslint-config-prettier | dev | BUILD/TOOLING | `.eslintrc.cjs:50` | keep |
| @myparcel-dev/eslint-config-prettier-typescript | dev | BUILD/TOOLING | `.eslintrc.cjs:32` | keep |
| @myparcel-dev/eslint-config-prettier-typescript-vue | dev | BUILD/TOOLING | `.eslintrc.cjs:12` | keep |
| @myparcel-dev/prettier-config | dev | BUILD/TOOLING | `package.json:50` (`prettier` field) | keep |
| @types/is-ci | dev | TYPE-ONLY | types for `is-ci` (used in admin-js/checkout-js vite configs) | keep |
| @vue/tsconfig | dev | BUILD/TOOLING | `tsconfig.base.json:2` (extends) | keep |
| array.prototype.flatmap | dev | **UNUSED** | only native `.flatMap()` used | **remove** |
| conventional-changelog-conventionalcommits | dev | BUILD/TOOLING | `monoweave.config.cjs:11` | keep |
| eslint | dev | BUILD/TOOLING | ws:lint scripts; `.eslintrc.cjs` | keep |
| eslint-plugin-sort-exports | dev | BUILD/TOOLING | `.eslintrc.cjs:6-8` | keep |
| husky | dev | BUILD/TOOLING | `prepare` script; `.husky/pre-commit` | keep |
| is-ci | dev | BUILD/TOOLING | `prepare` script; admin-js/checkout-js vite configs | keep |
| lint-staged | dev | BUILD/TOOLING | `.husky/pre-commit:4`; `lint-staged` block | keep |
| nodemon | dev | **UNUSED** | no config/script/CI/source ref | **remove** |
| nx | dev | BUILD/TOOLING | all `nx` scripts; `nx.json` | keep |
| prettier | dev | BUILD/TOOLING | lint-staged + `prettier` config field | keep |
| rimraf | dev | BUILD/TOOLING | `ws:clean` script | keep |
| typescript | dev | BUILD/TOOLING | `ws:ts:*` scripts run tsc | keep |

Note: `resolutions` pins `eslint-plugin-prettier`, `vue`, `tar`, `axios` — version pins, not declared deps. `eslint-plugin-prettier` is provided transitively by the eslint-config-prettier* packages (hence resolution-only).

---

## Confidence & caveats
- Every "UNUSED" verdict is "no reference found in src + config + scripts + (where relevant) CI/hooks". A dep could still be pulled in by something not searched (a generated file, an external consumer of a published package). Verify before deleting, especially the indirect providers in `admin-component-tests` (`@pinia/testing`, `happy-dom`, `pinia`).
- `typescript` appears at root and in most packages. Per-package pinning looks deliberate (each package can run its own `tsc`), so it's flagged as "redundant, low priority", not "remove".
- Phantom deps (section 7) work today via Yarn hoisting but are the bigger latent risk than the unused deps — a hoisting change or stricter install would break builds. Out of the original scope but recommended as a follow-up.
