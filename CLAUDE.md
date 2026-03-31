# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyParcel JS Plugin Development Kit (PDK) - a monorepo of npm packages for building e-commerce plugins that integrate with the MyParcel shipping platform. Two main domains: **admin** (back-office UI built with Vue 3 + Pinia) and **checkout** (front-end checkout integration with MyParcel Delivery Options).

## Commands

### Build & Dev

```bash
yarn build                    # Build all packages (production)
yarn build:dev                # Build all packages (development)
yarn serve                    # Dev server with watch + demo
nx build <package-name>       # Build a single package (e.g. nx build @myparcel-dev/pdk-admin)
```

### Testing (Vitest)

```bash
yarn test                     # Run all tests (parallel)
yarn test:run                 # Run all tests once (no watch)
yarn test:affected            # Run tests for affected packages only
cd apps/admin && vitest run   # Run tests for a single package
cd apps/admin && vitest run src/path/to/file.spec.ts  # Run a single test file
yarn test:update              # Update snapshots
yarn test:coverage            # Run with coverage
```

### Linting (ESLint 8)

```bash
yarn lint                     # Lint affected packages
yarn lint:fix                 # Lint + autofix affected packages
nx lint <package-name>        # Lint a single package
```

### Typecheck

```bash
yarn typecheck                # Typecheck all packages
```

## Architecture

### Monorepo Structure

- **Yarn 4 workspaces** with **Nx** for task orchestration, caching, and dependency-aware builds
- Nx default base branch `main`
- Package manager: `yarn@4.12.0`, Node >= 22

### Workspace Layout

**`apps/`** - Publishable packages and applications:
- `admin` - Core admin library (Vue 3 components, Pinia stores, TanStack Query)
- `admin-js` - Bundled admin entry point (Vite library build)
- `admin-preset-*` - UI component presets (Bootstrap 4, Dashicons, Font Awesome, default)
- `admin-component-tests` - Shared test utilities for admin component presets
- `admin-demo` - Demo app for development
- `checkout` - Core checkout library (aggregates checkout-* libs)
- `checkout-js` - Bundled checkout entry point
- `app-builder` - CLI tool (`pdk-builder`) for building apps, uses tsup
- `backend-demo` - Backend demo server

**`libs/`** - Internal shared libraries:
- `common` - Shared types and utilities across admin and checkout
- `build-vite` - Shared Vite/Vitest configuration factory (`createViteConfig`)
- `checkout-common`, `checkout-delivery-options`, `checkout-separate-address-fields`, `checkout-tax-fields` - Checkout sub-modules
- `backend/` - Backend sub-modules

### Key Patterns

- **Shared Vite config**: Most packages use `createViteConfig()` from `libs/build-vite/index.js` for both build and test config. Tests use `happy-dom` environment and look for `src/**/*.spec.ts`.
- **TypeScript paths**: `tsconfig.paths.json` maps `@myparcel-dev/pdk-*` to local source (`./apps/*/src`, `./libs/*/src`), so imports resolve to source during development.
- **Vue components use `Pdk` prefix** - ESLint is configured to allow `Pdk*` as undef components in Vue templates.
- **Exports in index.ts files must be sorted** (enforced by `sort-exports` ESLint plugin).
- **Packages publish `src/` and `dist/`** - exports point to `src/index.ts` for dev, `dist/` for types.
- **Deploy groups**: Packages have a `deployGroup` field (`admin`, `checkout`, `app-builder`) used by monoweave for versioning.

### Commit Convention

Uses [Conventional Commits](https://www.conventionalcommits.org/) with conventional-changelog. Releases are managed by monoweave.

## Future plans

We are creating plans for a major simplification of the JS-PDK. This is provided here as context not to do a major refactor now, but to ensure new features are added in a way that they can be easily migrated to the new structure when the time comes. The main goals of the refactor are:

- Simplify the codebase by removing unnecessary abstractions and layers.
- Improve maintainability and readability of the code.
- Reducing the complexity of the monorepo, removing anything that is not needed or not related to UI components.
- The repository should not define types and logic for specific carriers, their shipment options, etc.
- Types should be based off of the OpenAPI specification for the MyParcel API, rather than defining in constants and manually maintaining them.
- The goal for the above two points is to allow the JS-PDK to work with any new carrier, delivery type or shipment option at most needing a regeneration of the OpenApi-based types, but no manual code change
- The JS-PDK should mostly react to the context given to it by the PHP PDK / plugin and use OpenAPI types for type-safety.
