# Dynamic Shipment Options Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded shipment option fields with a dynamic loop over `carrier.options` from the order context, keeping a registry for exception fields (insurance, priority delivery) and a carrier-keyed inter-field dependency map.

**Architecture:** Dynamic field generation loop in `createShipmentOptionsForm.ts` iterates `carrier.options` keys. A field factory registry maps exception option names to custom factories. A carrier-keyed `requires`/`excludes` dependency map handles inter-field interactions. All carrier-specific hardcoded logic is removed.

**Tech Stack:** Vue 3, TypeScript, `@myparcel-dev/vue-form-builder`, vitest

---

### Task 1: Create the carrier-keyed field dependencies map

**Files:**
- Create: `apps/admin/src/forms/shipmentOptions/fieldDependencies.ts`
- Test: `apps/admin/src/forms/shipmentOptions/fieldDependencies.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
import {describe, expect, it} from 'vitest';
import {getFieldDependencies} from './fieldDependencies';

describe('getFieldDependencies', () => {
  it('returns dependencies for a known carrier and option', () => {
    const deps = getFieldDependencies('POSTNL', 'requiresAgeVerification');
    expect(deps).toEqual({
      requires: ['recipientOnlyDelivery', 'requiresSignature'],
      excludes: ['requiresReceiptCode'],
    });
  });

  it('returns undefined for a carrier with no dependencies', () => {
    const deps = getFieldDependencies('unknownCarrier', 'requiresAgeVerification');
    expect(deps).toBeUndefined();
  });

  it('returns undefined for an option with no dependencies', () => {
    const deps = getFieldDependencies('POSTNL', 'someUnknownOption');
    expect(deps).toBeUndefined();
  });

  it('returns DHL_FOR_YOU ageVerification dependencies', () => {
    const deps = getFieldDependencies('DHL_FOR_YOU', 'requiresAgeVerification');
    expect(deps).toEqual({
      excludes: ['requiresSignature'],
    });
  });

  it('returns DHL_FOR_YOU recipientOnlyDelivery dependencies', () => {
    const deps = getFieldDependencies('DHL_FOR_YOU', 'recipientOnlyDelivery');
    expect(deps).toEqual({
      excludes: ['requiresAgeVerification'],
    });
  });

  it('returns DHL_FOR_YOU requiresReceiptCode dependencies', () => {
    const deps = getFieldDependencies('DHL_FOR_YOU', 'requiresReceiptCode');
    expect(deps).toEqual({
      excludes: ['requiresAgeVerification'],
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/admin && npx vitest run src/forms/shipmentOptions/fieldDependencies.spec.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the implementation**

```ts
/**
 * Carrier-specific inter-field dependencies for shipment options.
 *
 * Uses `string` keys because option names come from the carrier context at
 * runtime and are not known at compile time.
 *
 * The structure mirrors the future API response format (`requires`/`excludes`
 * per option) so this map can be replaced by context data when available.
 *
 * - `requires`: when the source option is turned on, these fields are forced
 *   on and made read-only.
 * - `excludes`: when the source option is turned on, these fields are forced
 *   off and made read-only.
 *
 * @TODO Replace with `carrier.options[key].requires` / `carrier.options[key].excludes`
 *       from context when the API provides inter-option dependency data.
 */
export type OptionDependencies = {
  requires?: string[];
  excludes?: string[];
};

const fieldDependencies: Record<string, Record<string, OptionDependencies>> = {
  POSTNL: {
    requiresAgeVerification: {
      requires: ['recipientOnlyDelivery', 'requiresSignature'],
      excludes: ['requiresReceiptCode'],
    },
  },
  DHL_FOR_YOU: {
    requiresAgeVerification: {
      excludes: ['requiresSignature'],
    },
    recipientOnlyDelivery: {
      excludes: ['requiresAgeVerification'],
    },
    requiresReceiptCode: {
      excludes: ['requiresAgeVerification'],
    },
  },
};

/**
 * Look up inter-field dependencies for a given carrier and option name.
 * Returns undefined if no dependencies are defined.
 */
export const getFieldDependencies = (
  carrierName: string,
  optionName: string,
): OptionDependencies | undefined => {
  return fieldDependencies[carrierName]?.[optionName];
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/admin && npx vitest run src/forms/shipmentOptions/fieldDependencies.spec.ts`
Expected: all 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fieldDependencies.ts apps/admin/src/forms/shipmentOptions/fieldDependencies.spec.ts
git commit -m "feat: add carrier-keyed field dependencies map for shipment options"
```

---

### Task 2: Create the field factory registry

**Files:**
- Create: `apps/admin/src/forms/shipmentOptions/fieldFactoryRegistry.ts`

- [ ] **Step 1: Write the registry file**

This registry is a simple mapping — it will be tested through integration in Task 6 when the dynamic loop uses it. For now, it imports the existing factories (which will be adapted in Tasks 4 and 5).

```ts
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from './types';
import {type CarrierOptionData} from './carrierOptionData.types';
import {createInsuranceField} from './fields/createInsuranceField';
import {createPriorityDeliveryField} from './fields/createPriorityDeliveryField';

/**
 * Factory function signature for custom shipment option field creators.
 *
 * Uses `string` for fieldName because option names are determined at runtime
 * from the carrier context and are not a fixed compile-time set.
 */
export type FieldFactory = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
) => InteractiveElementConfiguration;

/**
 * Registry of shipment option names that require custom field rendering.
 *
 * Options NOT listed here are rendered as generic TriState toggles by
 * `createShipmentOptionField`. Each entry maps an option name (as it
 * appears in `carrier.options`) to its custom factory function.
 *
 * Current exceptions:
 * - `insurance`: renders as a select/dropdown with amount brackets
 *   derived from `insuredAmount` in the option data.
 * - `priorityDelivery`: uses a mailbox package type validator for
 *   show/hide logic (@TODO replace when context provides this reactively).
 */
export const fieldFactoryRegistry: Record<string, FieldFactory> = {
  insurance: createInsuranceField,
  priorityDelivery: createPriorityDeliveryField,
};
```

- [ ] **Step 2: Create the CarrierOptionData type**

Create `apps/admin/src/forms/shipmentOptions/carrierOptionData.types.ts`:

```ts
/**
 * Shape of a single option entry from `carrier.options` in the context.
 *
 * All options have `isRequired` and `isSelectedByDefault`. Some options
 * carry additional data (e.g., insurance has `insuredAmount`). The index
 * signature captures these extra fields.
 */
export type CarrierOptionData = {
  isRequired: boolean;
  isSelectedByDefault: boolean;
  [key: string]: unknown;
};
```

- [ ] **Step 3: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fieldFactoryRegistry.ts apps/admin/src/forms/shipmentOptions/carrierOptionData.types.ts
git commit -m "feat: add field factory registry and CarrierOptionData type"
```

---

### Task 3: Loosen types in hasShipmentOption and createHasShipmentOptionWatcher

**Files:**
- Modify: `apps/admin/src/forms/helpers/hasShipmentOption.ts`
- Modify: `apps/admin/src/forms/helpers/createHasShipmentOptionWatcher.ts`
- Modify: `apps/admin/src/forms/helpers/getFieldLabel.ts`

- [ ] **Step 1: Update hasShipmentOption**

Change the `option` parameter from `keyof Shipment.ModelShipmentOptions` to `string`:

```ts
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {getCarrier} from './getCarrier';

/**
 * Check whether the selected carrier supports a given shipment option.
 *
 * Accepts `string` (not a narrower type) because option names are dynamic —
 * they come from `carrier.options` in the context and are not a fixed set.
 */
export const hasShipmentOption = (form: FormInstance, option: string): boolean => {
  const carrier = getCarrier(form);

  return Object.hasOwn(carrier?.options ?? {}, option);
};
```

- [ ] **Step 2: Update createHasShipmentOptionWatcher**

Change the `shipmentOption` parameter from `keyof Shipment.ModelShipmentOptions` to `string`:

```ts
import {type InteractiveElementInstance, type FormInstance} from '@myparcel-dev/vue-form-builder';
import {isPackageTypePackage} from './isPackageTypePackage';
import {hasShipmentOption} from './hasShipmentOption';

/**
 * Creates a watcher that shows/hides a field based on whether the selected
 * carrier supports the given shipment option.
 *
 * Accepts `string` for the option name because options are dynamic.
 */
export const createHasShipmentOptionWatcher = (
  shipmentOption: string,
  invert = false,
  validator: (form: FormInstance) => boolean = isPackageTypePackage,
): ((field: InteractiveElementInstance) => boolean) => {
  return ({form}) => (validator(form) && hasShipmentOption(form, shipmentOption)) !== invert;
};
```

- [ ] **Step 3: Update getFieldLabel**

Change the `name` parameter from `keyof Shipment.ModelShipmentOptions` to `string`:

```ts
import {snakeCase} from 'lodash-unified';
import {SHIPMENT_OPTIONS} from '../shipmentOptions';

/**
 * Generates a translation key for a shipment option field label.
 *
 * Accepts `string` because option names come from the carrier context at
 * runtime. Converts to snake_case for the translation lookup.
 */
export const getFieldLabel = (name: string): string =>
  snakeCase(`${SHIPMENT_OPTIONS}_${name}`);
```

- [ ] **Step 4: Run existing tests to check nothing breaks**

Run: `cd apps/admin && npx vitest run`
Expected: PASS (no test changes needed — these functions keep the same runtime behavior)

- [ ] **Step 5: Commit**

```bash
git add apps/admin/src/forms/helpers/hasShipmentOption.ts apps/admin/src/forms/helpers/createHasShipmentOptionWatcher.ts apps/admin/src/forms/helpers/getFieldLabel.ts
git commit -m "refactor: loosen shipment option types from keyof to string for dynamic options"
```

---

### Task 4: Adapt createInsuranceField to use context option data

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/fields/createInsuranceField.ts`
- Modify: `apps/admin/src/forms/helpers/getInsuranceOptions.ts`

- [ ] **Step 1: Update createInsuranceField signature to match FieldFactory**

```ts
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {PROP_OPTIONS} from '../field';
import {
  createHasShipmentOptionWatcher,
  isPackageTypePackageOrSmall,
  resolveFormComponent,
  setFieldProp,
} from '../../helpers';
import {type ElementInstance} from '../../../types';
import {AdminComponent} from '../../../data';
import {useLocalizedFormatter} from '../../../composables';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {createShipmentOptionField} from './createShipmentOptionField';
import {createRef} from './createRef';
import {getInsuranceOptions} from '../../helpers/getInsuranceOptions';

/**
 * Custom field factory for the insurance shipment option.
 *
 * Renders as a select/dropdown instead of a TriState toggle. Insurance
 * amount brackets are derived from `optionData.insuredAmount` (min/max/default)
 * provided by the carrier context.
 */
export const createInsuranceField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
): InteractiveElementConfiguration => {
  const formatter = useLocalizedFormatter();
  const optionKey = fieldName.split('.').pop() ?? fieldName;

  return createShipmentOptionField(refs, fieldName, optionData, {
    ref: createRef(refs, fieldName, 0),
    component: resolveFormComponent(AdminComponent.SelectInput),
    visibleWhen: createHasShipmentOptionWatcher(optionKey, false, isPackageTypePackageOrSmall),
    disabledWhen: createHasShipmentOptionWatcher(optionKey, true, isPackageTypePackageOrSmall),
    onBeforeMount(field: ElementInstance) {
      const insurancePossibilities = getInsuranceOptions(optionData, formatter);

      setFieldProp(field, PROP_OPTIONS, insurancePossibilities);
    },
  });
};
```

- [ ] **Step 2: Update getInsuranceOptions to accept optionData instead of field**

```ts
import {TriState} from '@myparcel-dev/pdk-common';
import {type SelectOption} from '../../types';
import {Format, type Formatter} from '../../composables';
import {type CarrierOptionData} from '../shipmentOptions/carrierOptionData.types';

type InsuranceOptionData = CarrierOptionData & {
  insuredAmount?: {
    min: {amount: number; currency: string};
    max: {amount: number; currency: string};
    default: {amount: number; currency: string};
  };
};

/**
 * Generate insurance amount bracket options from carrier option data.
 *
 * Reads `insuredAmount.min` and `insuredAmount.max` from the option data
 * to produce select options. Amounts in the context are in cents.
 */
export const getInsuranceOptions = (optionData: CarrierOptionData, formatter: Formatter): SelectOption[] => {
  const insuranceData = optionData as InsuranceOptionData;
  const insurancePossibilities: number[] = [];

  const min = insuranceData.insuredAmount?.min.amount
    ? insuranceData.insuredAmount.min.amount / 100
    : 0;
  const max = insuranceData.insuredAmount?.max.amount
    ? insuranceData.insuredAmount.max.amount / 100
    : 0;

  if (max === 0) {
    return [];
  }

  const LOW_STEPS = 250;
  const HIGH_STEPS = 500;
  const LOW_THRESHOLD = 500;

  for (let i = min; i <= max; i += i < LOW_THRESHOLD ? LOW_STEPS : HIGH_STEPS) {
    insurancePossibilities.push(i * 100);
  }

  const carrierPossibilities = insurancePossibilities.map((amount) => ({
    plainLabel: formatter.format(Format.Currency, amount / 100),
    value: amount.toString(),
  }));

  return [
    {
      label: 'option_default',
      value: TriState.Inherit,
    },
    ...carrierPossibilities,
  ];
};
```

- [ ] **Step 3: Run tests**

Run: `cd apps/admin && npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fields/createInsuranceField.ts apps/admin/src/forms/helpers/getInsuranceOptions.ts
git commit -m "refactor: adapt insurance field to use carrier option data from context"
```

---

### Task 5: Adapt createPriorityDeliveryField to match FieldFactory signature

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/fields/createPriorityDeliveryField.ts`

- [ ] **Step 1: Update to match FieldFactory signature**

```ts
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {createHasShipmentOptionWatcher, isPackageTypeMailbox} from '../../helpers';
import {createShipmentOptionField} from './createShipmentOptionField';

/**
 * Custom field factory for the priority delivery shipment option.
 *
 * Uses a mailbox package type validator instead of the default package type
 * check, because priority delivery is only available for mailbox shipments.
 *
 * @TODO Replace with context-driven show/hide when the carrier options
 *       reactively update based on the selected package type.
 */
export const createPriorityDeliveryField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
): InteractiveElementConfiguration => {
  const optionKey = fieldName.split('.').pop() ?? fieldName;

  return createShipmentOptionField(refs, fieldName, optionData, {
    visibleWhen: createHasShipmentOptionWatcher(optionKey, false, isPackageTypeMailbox),
    disabledWhen: createHasShipmentOptionWatcher(optionKey, true, isPackageTypeMailbox),
  });
};
```

- [ ] **Step 2: Run tests**

Run: `cd apps/admin && npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fields/createPriorityDeliveryField.ts
git commit -m "refactor: adapt priority delivery field to match FieldFactory signature"
```

---

### Task 6: Update createShipmentOptionField to accept option metadata and apply dependencies

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.ts`
- Test: `apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts`

- [ ] **Step 1: Write failing tests for option metadata behavior**

```ts
import {describe, expect, it, vi} from 'vitest';
import {TriState} from '@myparcel-dev/pdk-common';
import {createShipmentOptionField} from './createShipmentOptionField';

// Minimal mock of dependencies — adjust based on existing test patterns in the project
vi.mock('../../helpers', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    resolveFormComponent: () => 'MockTriStateInput',
    createHasShipmentOptionWatcher: () => () => true,
  };
});

describe('createShipmentOptionField', () => {
  const createRefs = (fieldName: string, value?: unknown) => ({[fieldName]: value});

  it('creates a field with TriState.Inherit default when isSelectedByDefault is false', () => {
    const fieldName = 'deliveryOptions.shipmentOptions.testOption';
    const refs = createRefs(fieldName);
    const optionData = {isRequired: false, isSelectedByDefault: false};

    const field = createShipmentOptionField(refs, fieldName, optionData);

    expect(field.name).toBe(fieldName);
  });

  it('sets isRequired option data on the field', () => {
    const fieldName = 'deliveryOptions.shipmentOptions.testOption';
    const refs = createRefs(fieldName);
    const optionData = {isRequired: true, isSelectedByDefault: false};

    const field = createShipmentOptionField(refs, fieldName, optionData);

    expect(field.name).toBe(fieldName);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/admin && npx vitest run src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts`
Expected: FAIL — `createShipmentOptionField` does not accept `optionData` parameter

- [ ] **Step 3: Update createShipmentOptionField implementation**

```ts
import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {createHasShipmentOptionWatcher, defineFormField, getFieldLabel, resolveFormComponent} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * This is the default factory for any option from `carrier.options` that
 * does not have a custom factory in the field factory registry.
 *
 * @param refs - current form field refs built from order data
 * @param fieldName - full dotted path, e.g. `deliveryOptions.shipmentOptions.requiresSignature`
 * @param optionData - metadata from the carrier context (`isRequired`, `isSelectedByDefault`)
 * @param config - optional overrides (used by custom factories that extend this base)
 */
export const createShipmentOptionField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
  config?: Partial<InteractiveElementConfiguration>,
): InteractiveElementConfiguration => {
  const name = fieldName.split('.').pop() ?? fieldName;
  const defaultValue = optionData.isSelectedByDefault ? TriState.On : TriState.Inherit;
  const refValue = optionData.isRequired ? TriState.On : defaultValue;

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, refValue),
    label: getFieldLabel(name),
    visibleWhen: createHasShipmentOptionWatcher(name),
    disabledWhen: optionData.isRequired ? () => true : createHasShipmentOptionWatcher(name, true),
    ...config,
  });
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd apps/admin && npx vitest run src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.ts apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts
git commit -m "feat: update createShipmentOptionField to accept option metadata from context"
```

---

### Task 7: Rewrite createShipmentOptionsForm with dynamic field loop

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/createShipmentOptionsForm.ts`
- Test: `apps/admin/src/forms/shipmentOptions/createShipmentOptionsForm.spec.ts`

- [ ] **Step 1: Write failing tests for dynamic field generation**

```ts
import {describe, expect, it, vi} from 'vitest';

// These tests validate the field generation logic. Mocking will need to be
// adjusted based on the project's existing test setup and vue-form-builder
// mock patterns. The key behaviors to test:

describe('createShipmentOptionsFields (dynamic)', () => {
  it('generates a field for each key in carrier.options', () => {
    // Given carrier.options with 3 keys
    // When createShipmentOptionsFields is called
    // Then 3 shipment option fields are created (plus static fields)
  });

  it('uses the factory registry for known option names', () => {
    // Given carrier.options with key "insurance"
    // When createShipmentOptionsFields is called
    // Then createInsuranceField is used instead of the generic factory
  });

  it('uses generic createShipmentOptionField for unknown option names', () => {
    // Given carrier.options with key "someNewOption"
    // When createShipmentOptionsFields is called
    // Then createShipmentOptionField is used with TriState toggle
  });

  it('produces no shipment option fields when carrier.options is empty', () => {
    // Given carrier.options = {}
    // When createShipmentOptionsFields is called
    // Then only static fields are present
  });
});
```

Note: The exact test implementation will depend on how the existing test infrastructure mocks `useContext`, `useAdminConfig`, `useModalStore`, and the form builder. Adjust mock setup based on the patterns found in `apps/admin/src/forms/pluginSettings/generateFormFields.spec.ts`.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/admin && npx vitest run src/forms/shipmentOptions/createShipmentOptionsForm.spec.ts`
Expected: FAIL

- [ ] **Step 3: Rewrite createShipmentOptionsForm.ts**

```ts
/* eslint-disable @typescript-eslint/no-magic-numbers */
// noinspection JSUnusedGlobalSymbols

import {toRaw} from 'vue';
import {get} from 'lodash-unified';
import {defineForm, type FormInstance, type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {type Plugin} from '@myparcel-dev/pdk-common';
import {addBulkEditNotification} from '../helpers';
import {createShipmentFormName} from '../../utils';
import {useModalStore} from '../../stores';
import {AdminModalKey} from '../../data';
import {useAdminConfig} from '../../composables';
import {getCarrier} from '../helpers/getCarrier';
import {type ShipmentOptionsRefs} from './types';
import {type CarrierOptionData} from './carrierOptionData.types';
import {fieldFactoryRegistry} from './fieldFactoryRegistry';
import {createShipmentOptionField} from './fields/createShipmentOptionField';
import {createHideSenderField} from './fields/createHideSenderField';
import {createDeliveryTypeField} from './fields/createDeliveryTypeField';
import {createCarrierField} from './fields/createCarrierField';
import {
  createDigitalStampRangeField,
  createLabelAmountField,
  createPackageTypeField,
} from './fields';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_LABEL_AMOUNT, FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from './field';

const SHIPMENT_OPTIONS_PREFIX = 'deliveryOptions.shipmentOptions';

export const createShipmentOptionsForm = (orders?: OneOrMore<Plugin.ModelPdkOrder>): FormInstance => {
  const ordersArray = toArray(orders ?? []).map(toRaw);

  const config = useAdminConfig();
  const modalStore = useModalStore();

  const isBulk = ordersArray.length > 1;
  const isModal = AdminModalKey.ShipmentOptions === modalStore.opened;

  if (isBulk) {
    addBulkEditNotification(isModal);
  }

  const order = ((isBulk ? undefined : ordersArray[0]) ?? {}) as Plugin.ModelContextOrderDataContext;

  const carrierOptions = getCarrierOptions(order);
  const refs = buildDynamicRefs(order, carrierOptions);

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    ...(isModal ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: createShipmentOptionsFields(refs, order, carrierOptions),
  });
};

/**
 * Extract the options object from the carrier on the order's delivery options.
 * Returns an empty object if no carrier or options are found.
 */
const getCarrierOptions = (
  order: Plugin.ModelContextOrderDataContext,
): Record<string, CarrierOptionData> => {
  return (get(order, 'deliveryOptions.options') ?? {}) as Record<string, CarrierOptionData>;
};

/**
 * Build refs dynamically from carrier options and static fields.
 *
 * Instead of a hardcoded ALL_FIELDS list, refs are built from the actual
 * carrier options present in the context.
 */
const buildDynamicRefs = (
  order: Plugin.ModelContextOrderDataContext,
  carrierOptions: Record<string, CarrierOptionData>,
): ShipmentOptionsRefs => {
  const refs: ShipmentOptionsRefs = {};

  // Static field refs
  refs[FIELD_CARRIER] = get(order, `${FIELD_CARRIER}.externalIdentifier`);
  refs[FIELD_LABEL_AMOUNT] = get(order, FIELD_LABEL_AMOUNT);
  refs[FIELD_PACKAGE_TYPE] = get(order, FIELD_PACKAGE_TYPE);
  refs[FIELD_DELIVERY_TYPE] = get(order, FIELD_DELIVERY_TYPE);
  refs[FIELD_MANUAL_WEIGHT] = get(order, FIELD_MANUAL_WEIGHT);

  // Dynamic shipment option refs from carrier options
  for (const key of Object.keys(carrierOptions)) {
    const fieldName = `${SHIPMENT_OPTIONS_PREFIX}.${key}`;
    refs[fieldName] = get(order, fieldName);
  }

  return refs;
};

const createShipmentOptionsFields = (
  refs: ShipmentOptionsRefs,
  order: Plugin.ModelContextOrderDataContext,
  carrierOptions: Record<string, CarrierOptionData>,
): InteractiveElementConfiguration[] => {
  // Static fields — always present
  const staticFields = [
    createCarrierField(refs, order.inheritedDeliveryOptions),
    createPackageTypeField(refs),
    createDeliveryTypeField(refs),
    createLabelAmountField(refs),
    createDigitalStampRangeField(refs, order),
  ];

  // Dynamic shipment option fields — driven by carrier.options
  const dynamicFields = Object.entries(carrierOptions).map(([key, optionData]) => {
    const fieldName = `${SHIPMENT_OPTIONS_PREFIX}.${key}`;
    const factory = fieldFactoryRegistry[key];

    if (factory) {
      return factory(refs, fieldName, optionData);
    }

    return createShipmentOptionField(refs, fieldName, optionData);
  });

  return [...staticFields, ...dynamicFields];
};
```

- [ ] **Step 4: Run tests**

Run: `cd apps/admin && npx vitest run`
Expected: PASS (some tests may need adjustment if they reference deleted fields)

- [ ] **Step 5: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/createShipmentOptionsForm.ts apps/admin/src/forms/shipmentOptions/createShipmentOptionsForm.spec.ts
git commit -m "feat: replace hardcoded shipment option fields with dynamic carrier.options loop"
```

---

### Task 8: Clean up field.ts — remove hardcoded shipment option constants

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/field.ts`

- [ ] **Step 1: Remove all shipment option constants, keep static field constants**

```ts
export type FieldName = string;

const DELIVERY_OPTIONS_PREFIX = 'deliveryOptions';

const PHYSICAL_PROPERTIES_PREFIX = 'physicalProperties';

export const SHIPMENT_OPTIONS = 'shipmentOptions';

export const CARRIER = 'carrier';

export const LABEL_AMOUNT = 'labelAmount';

export const PACKAGE_TYPE = 'packageType';

export const DELIVERY_TYPE = 'deliveryType';

export const MANUAL_WEIGHT = 'manualWeight';

export const PROP_OPTIONS = 'options';

export const KEY_DESCRIPTION = 'description';

export const KEY_SUBTEXT = 'subtext';

export const FIELD_CARRIER: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${CARRIER}`;

export const FIELD_LABEL_AMOUNT: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${LABEL_AMOUNT}`;

export const FIELD_PACKAGE_TYPE: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${PACKAGE_TYPE}`;

export const FIELD_DELIVERY_TYPE: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${DELIVERY_TYPE}`;

export const FIELD_MANUAL_WEIGHT: FieldName = `${PHYSICAL_PROPERTIES_PREFIX}.${MANUAL_WEIGHT}`;
```

Removed constants: `AGE_CHECK`, `RECEIPT_CODE`, `DIRECT_RETURN`, `HIDE_SENDER`, `LARGE_FORMAT`, `ONLY_RECIPIENT`, `SAME_DAY_DELIVERY`, `SIGNATURE`, `INSURANCE`, `PRIORITY_DELIVERY`, and all their `FIELD_*` counterparts, plus `ALL_FIELDS`.

- [ ] **Step 2: Run tests to check for broken imports**

Run: `cd apps/admin && npx vitest run`
Expected: May fail if other files still import removed constants — fix in next steps.

- [ ] **Step 3: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/field.ts
git commit -m "refactor: remove hardcoded shipment option constants from field.ts"
```

---

### Task 9: Delete simple field files and carrier-specific helpers

**Files:**
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createDirectReturnField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createLargeFormatField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createHideSenderField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createSameDayDeliveryField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createAgeCheckField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createOnlyRecipientField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createSignatureField.ts`
- Delete: `apps/admin/src/forms/shipmentOptions/fields/createReceiptCodeField.ts`
- Delete: `apps/admin/src/forms/helpers/hasPostNlAgeCheck.ts`
- Delete: `apps/admin/src/forms/helpers/setPostNlAgeCheckSubtext.ts`
- Modify: `apps/admin/src/forms/shipmentOptions/fields/index.ts`
- Modify: `apps/admin/src/forms/helpers/index.ts`

- [ ] **Step 1: Delete the simple field files**

```bash
rm apps/admin/src/forms/shipmentOptions/fields/createDirectReturnField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createLargeFormatField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createHideSenderField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createSameDayDeliveryField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createAgeCheckField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createOnlyRecipientField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createSignatureField.ts
rm apps/admin/src/forms/shipmentOptions/fields/createReceiptCodeField.ts
```

- [ ] **Step 2: Delete carrier-specific helpers**

```bash
rm apps/admin/src/forms/helpers/hasPostNlAgeCheck.ts
rm apps/admin/src/forms/helpers/setPostNlAgeCheckSubtext.ts
```

- [ ] **Step 3: Update fields/index.ts**

```ts
export * from './createDigitalStampRangeField';
export * from './createInsuranceField';
export * from './createLabelAmountField';
export * from './createPackageTypeField';
export * from './createPriorityDeliveryField';
export * from './createRef';
export * from './createShipmentOptionField';
```

- [ ] **Step 4: Update helpers/index.ts — remove deleted exports**

Remove these lines from `apps/admin/src/forms/helpers/index.ts`:
```ts
export * from './hasPostNlAgeCheck';
export * from './setPostNlAgeCheckSubtext';
```

- [ ] **Step 5: Check if getFormCarrierName is still used elsewhere**

Search for imports of `getFormCarrierName`. If only used by the deleted files, delete `apps/admin/src/forms/helpers/getFormCarrierName.ts` and remove its export from `helpers/index.ts`.

- [ ] **Step 6: Run tests**

Run: `cd apps/admin && npx vitest run`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add -A apps/admin/src/forms/shipmentOptions/fields/ apps/admin/src/forms/helpers/
git commit -m "refactor: delete hardcoded field files and carrier-specific helpers"
```

---

### Task 10: Update createCarrierField — remove carrier-specific logic

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/fields/createCarrierField.ts`

- [ ] **Step 1: Remove setPostNlAgeCheckSubtext and hardcoded FIELD_INSURANCE update**

The `afterUpdate` should keep `updateFieldsDefaults` and the package type / delivery type updates, but remove the POSTNL-specific subtext and the direct insurance options update:

```ts
import {toValue} from 'vue';
import {snakeCase} from 'lodash-unified';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type Plugin} from '@myparcel-dev/pdk-common';
import {PackageTypeName} from '@myparcel-dev/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE, PROP_OPTIONS} from '../field';
import {getDeliveryTypes} from '../../helpers/getDeliveryTypes';
import {
  defineFormField,
  getPackageTypes,
  resolveFormComponent,
  setFieldProp,
  updateFieldsDefaults,
} from '../../helpers';
import {createAssetUrl} from '../../../utils';
import {type RadioGroupOption} from '../../../types';
import {useFetchCarrier} from '../../../sdk';
import {AdminComponent} from '../../../data';
import {useContext, useLanguage} from '../../../composables';
import {AdminContextKey} from '@myparcel-dev/pdk-common';
import {createRef} from './createRef';

// eslint-disable-next-line max-lines-per-function
export const createCarrierField = (
  refs: ShipmentOptionsRefs,
  inheritedDeliveryOptions: Plugin.ModelContextOrderDataContext['inheritedDeliveryOptions'],
): InteractiveElementConfiguration => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);

  const {translate} = useLanguage();

  return defineFormField({
    name: FIELD_CARRIER,
    label: 'carrier',
    ref: createRef<string>(refs, FIELD_CARRIER, PackageTypeName.Package),
    component: resolveFormComponent(AdminComponent.RadioGroup),
    props: {
      options: [],
    },

    onBeforeMount: async (field) => {
      const carrierSelectOptions = await Promise.all(
        dynamicContext.carriers.map(async (carrier): Promise<RadioGroupOption> => {
          const query = useFetchCarrier(carrier.carrier);
          await query.suspense();

          const apiCarrier = toValue(query.data);

          const plainLabel = apiCarrier?.human ?? translate(`carrier_${snakeCase(carrier.carrier)}`) ?? '';

          return {
            plainLabel,
            value: carrier.carrier ?? '',
            image: apiCarrier?.meta.logo_svg ? createAssetUrl(apiCarrier.meta.logo_svg) : undefined,
          };
        }),
      );

      setFieldProp(field, PROP_OPTIONS, carrierSelectOptions);

      await field?.afterUpdate?.(field, toValue(field.ref), undefined);

      updateFieldsDefaults(toValue(field.ref) as string, field, inheritedDeliveryOptions);
    },

    afterUpdate: (field, newCarrier: string) => {
      updateFieldsDefaults(newCarrier, field, inheritedDeliveryOptions);

      setFieldProp(field.form, FIELD_PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(field.form));
      setFieldProp(field.form, FIELD_DELIVERY_TYPE, PROP_OPTIONS, getDeliveryTypes(field.form));
    },
  });
};
```

- [ ] **Step 2: Run tests**

Run: `cd apps/admin && npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fields/createCarrierField.ts
git commit -m "refactor: remove carrier-specific logic from createCarrierField"
```

---

### Task 11: Wire up inter-field dependencies in createShipmentOptionField

**Files:**
- Modify: `apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.ts`
- Modify: `apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts`

- [ ] **Step 1: Add failing tests for dependency behavior**

Add to the existing spec file:

```ts
import {describe, expect, it, vi} from 'vitest';
import {TriState} from '@myparcel-dev/pdk-common';

// Test the dependency application logic. Since afterUpdate interacts with
// the form instance, these tests need a mock form that supports
// setValue/getField. Adjust mocking based on existing patterns.

describe('createShipmentOptionField dependency behavior', () => {
  it('applies requires dependencies — forces required fields on and read-only', () => {
    // Given a POSTNL carrier with requiresAgeVerification having
    //   requires: ['recipientOnlyDelivery', 'requiresSignature']
    // When requiresAgeVerification is turned on
    // Then recipientOnlyDelivery and requiresSignature are set to TriState.On
    //   and their disabledWhen returns true
  });

  it('applies excludes dependencies — forces excluded fields off and read-only', () => {
    // Given a DHL_FOR_YOU carrier with requiresAgeVerification having
    //   excludes: ['requiresSignature']
    // When requiresAgeVerification is turned on
    // Then requiresSignature is set to TriState.Off and disabled
  });

  it('releases dependencies when source option is turned off', () => {
    // Given requiresAgeVerification was on (with dependencies applied)
    // When requiresAgeVerification is turned off
    // Then dependent fields are no longer forced/disabled
  });

  it('ignores dependencies for options not in carrier.options', () => {
    // Given a dependency references an option not present in the form
    // When the source option is toggled
    // Then no error is thrown
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/admin && npx vitest run src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts`
Expected: FAIL

- [ ] **Step 3: Add afterUpdate dependency logic to createShipmentOptionField**

Update `createShipmentOptionField` to apply dependencies from the carrier-keyed map:

```ts
import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {getFieldDependencies} from '../fieldDependencies';
import {createHasShipmentOptionWatcher, defineFormField, getFieldLabel, resolveFormComponent} from '../../helpers';
import {getFormCarrierName} from '../../helpers/getFormCarrierName';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

const SHIPMENT_OPTIONS_PREFIX = 'deliveryOptions.shipmentOptions';

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * This is the default factory for any option from `carrier.options` that
 * does not have a custom factory in the field factory registry.
 *
 * @param refs - current form field refs built from order data
 * @param fieldName - full dotted path, e.g. `deliveryOptions.shipmentOptions.requiresSignature`
 * @param optionData - metadata from the carrier context (`isRequired`, `isSelectedByDefault`)
 * @param config - optional overrides (used by custom factories that extend this base)
 */
export const createShipmentOptionField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
  config?: Partial<InteractiveElementConfiguration>,
): InteractiveElementConfiguration => {
  const name = fieldName.split('.').pop() ?? fieldName;
  const defaultValue = optionData.isSelectedByDefault ? TriState.On : TriState.Inherit;
  const refValue = optionData.isRequired ? TriState.On : defaultValue;

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, refValue),
    label: getFieldLabel(name),
    visibleWhen: createHasShipmentOptionWatcher(name),
    disabledWhen: optionData.isRequired ? () => true : createHasShipmentOptionWatcher(name, true),

    afterUpdate(field, value) {
      const carrierName = getFormCarrierName(field.form);

      if (!carrierName) {
        return;
      }

      const deps = getFieldDependencies(carrierName, name);

      if (!deps) {
        return;
      }

      const isEnabled = TriState.On === value;

      for (const requiredOption of deps.requires ?? []) {
        const targetField = field.form.getField(`${SHIPMENT_OPTIONS_PREFIX}.${requiredOption}`);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          field.form.setValue(targetField.name, TriState.On);
          targetField.props.readOnly = true;
        } else {
          targetField.props.readOnly = false;
        }
      }

      for (const excludedOption of deps.excludes ?? []) {
        const targetField = field.form.getField(`${SHIPMENT_OPTIONS_PREFIX}.${excludedOption}`);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          field.form.setValue(targetField.name, TriState.Off);
          targetField.props.readOnly = true;
        } else {
          targetField.props.readOnly = false;
        }
      }
    },

    ...config,
  });
};
```

Note: If `config` includes its own `afterUpdate`, it will override the dependency logic. Custom factories that need both should call the dependency logic explicitly or compose the afterUpdate handlers. This is acceptable because the current custom factories (insurance, priorityDelivery) do not have inter-field dependencies.

- [ ] **Step 4: Verify getFormCarrierName is retained**

Since `createShipmentOptionField` now uses `getFormCarrierName`, ensure it was NOT deleted in Task 9 step 5. If it was, restore it and its export in `helpers/index.ts`.

- [ ] **Step 5: Run all tests**

Run: `cd apps/admin && npx vitest run`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.ts apps/admin/src/forms/shipmentOptions/fields/createShipmentOptionField.spec.ts
git commit -m "feat: apply carrier-keyed inter-field dependencies in createShipmentOptionField"
```

---

### Task 12: Update CarrierModel type and clean up unused types

**Files:**
- Modify: `libs/common/src/types/carrier.types.ts`
- Evaluate: `libs/common/src/types/php-pdk.types.ts` (`ModelShipmentOptions`)

- [ ] **Step 1: Verify CarrierModel type is sufficient**

The existing `CarrierModel` in `carrier.types.ts` already has `options` typed as `Record<string, {...}>`. Verify it matches the actual context data shape. The `insurance?` special case in the type should remain since it documents the known extended shape.

- [ ] **Step 2: Check if ModelShipmentOptions is still referenced**

Search for `ModelShipmentOptions` usage:

```bash
cd /Users/freek.vanrijt/projects/js-pdk && grep -r "ModelShipmentOptions" --include="*.ts" --include="*.vue" -l
```

If it's only referenced in `php-pdk.types.ts` itself (as a type definition) and in the now-loosened `hasShipmentOption`/`createHasShipmentOptionWatcher` (which no longer use `keyof`), it can stay as-is — it's still a valid type for other consumers. Do not modify `php-pdk.types.ts`.

- [ ] **Step 3: Run full test suite**

Run: `cd apps/admin && npx vitest run`
Expected: PASS

- [ ] **Step 4: Commit (only if type changes were needed)**

```bash
git add libs/common/src/types/carrier.types.ts
git commit -m "refactor: update CarrierModel type for dynamic shipment options"
```

---

### Task 13: Final integration verification

**Files:**
- No new files

- [ ] **Step 1: Run the full test suite across all packages**

Run: `npx vitest run` (from project root, or per-package as configured)
Expected: PASS

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit` (or the project's type-check script)
Expected: No errors

- [ ] **Step 3: Verify the build completes**

Run: `yarn build` (or the project's build command)
Expected: Build succeeds

- [ ] **Step 4: Manual smoke test (if applicable)**

If a dev server is available, verify:
- Carrier selection shows dynamic shipment options from context
- Switching carrier updates available options
- Insurance renders as a select dropdown
- Priority delivery shows/hides based on mailbox package type
- Inter-field dependencies work (e.g., POSTNL ageVerification forces signature/onlyRecipient on)

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address integration issues from dynamic shipment options migration"
```
