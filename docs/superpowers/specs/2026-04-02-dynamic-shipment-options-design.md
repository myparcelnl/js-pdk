# Dynamic Shipment Options

## Goal

Make shipment options in the admin UI fully dynamic, driven by `carrier.options` from the order context rather than a hardcoded list of fields. Any arbitrary shipment option key becomes a form field automatically. A small registry of custom field factories handles exceptions (insurance, priority delivery). Inter-field dependencies use a `requires`/`excludes` structure that mirrors the future API format.

## Context

The `pdk-order-box` receives order data including `orderData.deliveryOptions.carrier.options`, where each key represents a supported shipment option for the selected carrier. Example:

```json
{
  "requiresAgeVerification": {
    "isSelectedByDefault": false,
    "isRequired": false
  },
  "insurance": {
    "isSelectedByDefault": false,
    "isRequired": false,
    "insuredAmount": {
      "default": { "currency": "EUR", "amount": 0 },
      "min": { "currency": "EUR", "amount": 0 },
      "max": { "currency": "EUR", "amount": 500000 }
    }
  }
}
```

Currently, each shipment option has its own `create*Field.ts` file, many of which are trivial delegations to `createShipmentOptionField`. The list of fields is hardcoded in `createShipmentOptionsForm.ts` and `field.ts` (`ALL_FIELDS`). Carrier-specific side-effects (POSTNL, DHL_FOR_YOU) are hardcoded in individual field files.

## Architecture

### Dynamic field generation loop

`createShipmentOptionsFields` iterates over the keys of `carrier.options`. For each key:

1. Look up the key in a **field factory registry** (`Record<string, FieldFactory>`)
2. If a factory exists, use it (passing refs, option key, and the option's data from context)
3. If not, call `createShipmentOptionField` generically — producing a TriState toggle with a label derived from `shipment_option_${snakeCase(key)}`

Static fields (carrier, package type, delivery type, label amount, digital stamp range) are rendered before the dynamic loop, exactly as today. They are not part of `carrier.options`.

### Option metadata from context

Each option in `carrier.options` provides:

- `isRequired` — field is forced on and disabled (not editable by the user)
- `isSelectedByDefault` — field defaults to on but can be toggled off

These values are applied by `createShipmentOptionField` when creating generic fields, and by custom factories for their respective fields.

### Field factory registry

A map of option names to custom field creator functions:

```ts
/**
 * Registry of custom field factories for shipment options that need
 * non-standard rendering (e.g., different component, custom validation).
 *
 * Options NOT in this registry are rendered as generic TriState toggles.
 * Uses `string` keys because option names come from the carrier context
 * at runtime and are not known at compile time.
 */
type FieldFactory = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
) => InteractiveElementConfiguration;

const fieldFactoryRegistry: Record<string, FieldFactory> = {
  insurance: createInsuranceField,
  priorityDelivery: createPriorityDeliveryField,
};
```

- **`createInsuranceField`** — renders a select/dropdown using `insuredAmount.default`, `insuredAmount.min`, and `insuredAmount.max` from the option data
- **`createPriorityDeliveryField`** — uses the current mailbox package type validator for show/hide. `@TODO`: replace when the context reactively provides show/hide based on selected package type

### Inter-field dependencies

The current context provides **carrier-wide** restrictions only (which options exist, `isRequired`, `isSelectedByDefault`). It does **not** yet provide carrier-specific inter-option dependencies (e.g., "age verification requires signature"). Those will come in a future API iteration.

Until then, a hardcoded carrier-keyed map defines inter-field dependencies using `requires`/`excludes` — terminology chosen to match the future API structure for easy replacement:

```ts
/**
 * Carrier-specific inter-field dependencies for shipment options.
 *
 * Uses `string` keys/values because option names are dynamic and come from
 * the carrier context. The structure mirrors the future API response format
 * so this map can be replaced by context data when available.
 *
 * @TODO Replace with `carrier.options[key].requires` / `carrier.options[key].excludes`
 *       from context when the API provides inter-option dependency data.
 */
type OptionDependencies = {
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
```

The map is keyed by carrier identifier (matching `carrier.carrier` from the context), then by option name. When an option with dependencies is turned on:
- `requires` — those fields are forced on and made read-only
- `excludes` — those fields are forced off and made read-only

Carriers not in the map have no inter-field dependencies.

### Dynamic refs

The `ALL_FIELDS` constant is removed. Instead, refs are built dynamically at form creation time from the carrier's option keys:

```ts
const refs = Object.keys(carrier.options).reduce((acc, key) => {
  acc[`deliveryOptions.shipmentOptions.${key}`] = get(order, `deliveryOptions.shipmentOptions.${key}`);
  return acc;
}, {} as ShipmentOptionsRefs);
```

Static field refs (carrier, package type, etc.) are added separately as they are today.

## Files

### Delete

Trivial delegations to `createShipmentOptionField` with no custom logic, or files containing carrier-specific hardcoded side-effects that are being removed:

- `fields/createDirectReturnField.ts`
- `fields/createLargeFormatField.ts`
- `fields/createHideSenderField.ts`
- `fields/createSameDayDeliveryField.ts`
- `fields/createAgeCheckField.ts`
- `fields/createOnlyRecipientField.ts`
- `fields/createSignatureField.ts`
- `fields/createReceiptCodeField.ts`

### Modify (shipment options)

- **`createShipmentOptionsForm.ts`** — replace hardcoded field list with dynamic loop over `carrier.options`; build refs dynamically
- **`createShipmentOptionField.ts`** — accept option metadata (`isRequired`, `isSelectedByDefault`); apply `requires`/`excludes` dependencies via `afterUpdate`
- **`createInsuranceField.ts`** — adapt to receive option data from context; use `insuredAmount` for dropdown options
- **`createPriorityDeliveryField.ts`** — adapt signature to match registry pattern; add `@TODO` marker
- **`field.ts`** — remove `ALL_FIELDS` and all shipment option constants (keep static field constants: carrier, package type, delivery type, label amount, and delivery options prefix)
- **`fields/index.ts`** — remove deleted exports, add registry export
- **`types.ts`** — no changes needed (`ShipmentOptionsRefs` is already `Record<FieldName, unknown>`)
- **`hasShipmentOption.ts`** — accept `string` instead of `keyof Shipment.ModelShipmentOptions` (option names are dynamic from context, not a compile-time set)
- **`createHasShipmentOptionWatcher.ts`** — same: accept `string` instead of `keyof Shipment.ModelShipmentOptions`

### Modify (static fields)

- **`createCarrierField.ts`** — remove `setPostNlAgeCheckSubtext` call and hardcoded `FIELD_INSURANCE` options update from `afterUpdate`. The carrier field's `afterUpdate` still calls `updateFieldsDefaults` (which already works generically) and updates package type/delivery type options. Insurance options will be set by the insurance field factory itself based on context data.

### New

- **`fieldFactoryRegistry.ts`** — registry mapping option names to custom factories, with documentation explaining why each entry exists
- **`fieldDependencies.ts`** — declarative `requires`/`excludes` map for inter-field dependencies, documented with `@TODO` for future API replacement

### Cleanup

Types and helpers that become unused after removing hardcoded field files should be deleted rather than left behind:

- `Shipment.ModelShipmentOptions` in `php-pdk.types.ts` — evaluate if still referenced; if only used for the removed `keyof` constraints, leave in place but do not modify (cast where needed instead)
- Carrier-specific helpers: `hasPostNlAgeCheck`, `setPostNlAgeCheckSubtext`, `getFormCarrierName` — delete if no longer imported anywhere
- Shipment option constants in `field.ts` (`AGE_CHECK`, `SIGNATURE`, etc.) — delete along with their `FIELD_*` counterparts

### Untouched

- `createPackageTypeField.ts`
- `createDeliveryTypeField.ts`
- `createLabelAmountField.ts`
- `createDigitalStampRangeField.ts`
- `createRef.ts`

## Removed carrier-specific logic

All hardcoded carrier-specific conditionals are removed:

- POSTNL age check forcing signature/onlyRecipient on
- DHL_FOR_YOU age check forcing signature off
- DHL_FOR_YOU onlyRecipient/receiptCode turning off ageCheck
- POSTNL age check subtext
- Any `CarrierName.*` imports in shipment option field files

The context data already accounts for carrier-wide rules. The `requires`/`excludes` dependency map handles inter-field interactions generically until the API provides this data per carrier.

## Testing

### Unit tests for dynamic field generation

- Providing `carrier.options` with arbitrary keys produces a form field for each key
- Keys not in the factory registry produce generic TriState toggle fields
- Keys in the factory registry invoke their custom factory (insurance, priorityDelivery)
- An empty `carrier.options` produces no shipment option fields (only static fields)

### Unit tests for option metadata

- `isRequired: true` forces the field on and makes it non-editable
- `isRequired: false` leaves the field editable
- `isSelectedByDefault: true` sets the initial ref value to on
- `isSelectedByDefault: false` sets the initial ref value to inherit/off

### Unit tests for inter-field dependencies

- Turning on an option with `requires` forces required fields on and makes them read-only
- Turning off an option with `requires` releases the required fields back to editable
- Turning on an option with `excludes` forces excluded fields off and makes them read-only
- Turning off an option with `excludes` releases the excluded fields back to editable
- Dependencies referencing option keys not present in `carrier.options` are silently ignored
- Carrier with no entry in the dependency map has no inter-field side-effects
- POSTNL ageVerification requires onlyRecipient + signature, excludes receiptCode
- DHL_FOR_YOU ageVerification excludes signature; onlyRecipient/receiptCode exclude ageVerification

### Unit tests for custom factories

- Insurance field renders as select input with options derived from `insuredAmount.min`/`max`/`default`
- Priority delivery field uses mailbox package type validator for visibility

### Integration/regression

- Switching carrier updates the set of visible shipment option fields
- Static fields (carrier, package type, delivery type, label amount, digital stamp range) are always present regardless of carrier
