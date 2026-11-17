# Capabilities request carries the selected options — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make a capabilities request able to carry the currently selected shipment options, end to end, from the admin browser through the PDK proxy to the MyParcel API.

**Architecture:** Two independent defects block the selection from reaching the API. In PHP, `json_decode($body, true)` turns the wire's `{}` into an empty PHP array, and the SDK's serializer then sends `[]`, which is the wrong JSON type for an option. In TypeScript, the proxy body types `options` as `string[]`, so the correct shape cannot even be expressed. This plan fixes both and proves the round trip. It changes no behaviour: after this plan nothing sends options yet, but everything can.

**Tech Stack:** PHP 7.4 (floor), Pest 1.x, Guzzle, the generated MyParcel SDK. TypeScript, Vue 3, Vitest, TanStack Query.

**Spec:** `docs/superpowers/specs/2026-09-16-shipment-option-determination.md`

## Global Constraints

- PHP syntax floor is **7.4** (`pdk/composer.json:12`, platform pinned at `:17-19`). No constructor property promotion, no `match`, no enums, no union types in signatures, no nullsafe operator.
- PHP tests run **through Docker**, never with `vendor/bin/pest` directly — the suite needs `auto_prepend_file=tests/bootstrap.php`. Use `docker compose run php composer test -- --filter="<name>"` from `~/projects/pdk`.
- Pest **v1**, not v2.
- The PDK repo is `~/projects/pdk`; the JS monorepo is `~/projects/js-pdk`. Tasks name which.
- Commit messages follow Conventional Commits.
- This plan must not change any existing request. Every current caller sends no `options` key and must keep producing byte-identical request bodies.

---

### Task 1: An option with no arguments serialises as `{}`

An option is requested by sending its key with an empty object value: `{"requiresAgeVerification": {}}`. PHP loses that shape twice — once at `json_decode(..., true)` in the action, once in the SDK serializer, which passes an empty array through unchanged. The fix belongs in `hydrateModel()` because it sits downstream of the decode and upstream of the serializer, so it covers both the browser path and any internal caller.

**Files:**
- Modify: `~/projects/pdk/src/SdkApi/Service/CoreApi/Shipment/CapabilitiesService.php:215-238`
- Test: `~/projects/pdk/tests/Unit/SdkApi/Service/CoreApi/Shipment/CapabilitiesServiceTest.php`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `CapabilitiesService::getCapabilities(array $parameters, bool $filterSupported = false): array` now accepts an `options` key whose values are empty arrays, and emits them as JSON objects. Signature is unchanged.

- [ ] **Step 1: Write the failing test**

Append to `tests/Unit/SdkApi/Service/CoreApi/Shipment/CapabilitiesServiceTest.php`.

The assertion runs against the **raw body string**, not `json_decode(..., true)`. Associative decoding turns both `[]` and `{}` back into an empty PHP array, so a decoded assertion passes either way and proves nothing.

```php
it('sends an option with no arguments as an empty JSON object', function () {
    TestBootstrapper::hasApiKey('test-key');

    $service = new MockableCapabilitiesService();
    $service->mockHandler->append(new Response(200, [], json_encode(['results' => []])));

    $service->getCapabilities([
        'carrier'     => 'POSTNL',
        'recipient'   => ['countryCode' => 'NL'],
        'packageType' => 'PACKAGE',
        'options'     => ['requiresAgeVerification' => []],
    ]);

    $body = (string) $service->capturedRequests[0]->getBody();

    expect($body)->toContain('"requiresAgeVerification":{}')
        ->and($body)->not->toContain('"requiresAgeVerification":[]');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd ~/projects/pdk && docker compose run php composer test -- --filter="sends an option with no arguments"
```

Expected: FAIL. The body contains `"requiresAgeVerification":[]`.

- [ ] **Step 3: Write the minimal implementation**

In `src/SdkApi/Service/CoreApi/Shipment/CapabilitiesService.php`, inside `hydrateModel()`, extend the existing `if` with an `elseif`. The full loop body afterwards:

```php
        foreach ($data as $key => $value) {
            $property    = $camelToSnake[$key] ?? $key;
            $nestedClass = ltrim((string) ($openAPITypes[$property] ?? ''), '\\');

            if (
                is_array($value)
                && class_exists($nestedClass)
                && is_subclass_of($nestedClass, ModelInterface::class)
            ) {
                $value = $this->hydrateModel($nestedClass, $value);
            } elseif ('object' === $nestedClass && [] === $value) {
                // An option with no arguments is `{}` on the wire. json_decode(…, true) flattened
                // it to an empty array, and the serializer would send `[]`, which the API reads as
                // the wrong type. Only the empty case is wrong: a non-empty associative array
                // already encodes as an object.
                $value = new \stdClass();
            }

            $normalized[$property] = $value;
        }
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
cd ~/projects/pdk && docker compose run php composer test -- --filter="sends an option with no arguments"
```

Expected: PASS.

- [ ] **Step 5: Run the whole capabilities suite to prove no existing request changed**

```bash
cd ~/projects/pdk && docker compose run php composer test -- --filter="Capabilities"
```

Expected: PASS, including the existing body-shape tests at `CapabilitiesServiceTest.php:93`, `:126`, `:141`, `:157`, `:169` and `:195`.

- [ ] **Step 6: Commit**

```bash
cd ~/projects/pdk
git add src/SdkApi/Service/CoreApi/Shipment/CapabilitiesService.php tests/Unit/SdkApi/Service/CoreApi/Shipment/CapabilitiesServiceTest.php
git commit -m "fix(capabilities): send an option with no arguments as an empty object"
```

---

### Task 2: The proxy request can express a selection

`ProxyCapabilitiesBody.options` is typed `string[]`, which cannot express the object map the API wants. The shipment query must be able to forward a selection. Nothing calls it with one yet, so behaviour does not change.

The form holds a flat list of option keys that are on. The API wants a nested map. The query does that mapping at the call site, the same way it already maps `cc` to `recipient.countryCode` and `weight` to `physicalProperties.weight`. Keys are sorted so the TanStack query key is stable regardless of the order the form produces them in.

**Files:**
- Modify: `~/projects/js-pdk/apps/admin/src/types/sdk.types.ts:219`
- Modify: `~/projects/js-pdk/apps/admin/src/actions/composables/queries/account/useShipmentCapabilitiesQuery.ts`
- Test: `~/projects/js-pdk/apps/admin/src/actions/composables/queries/account/useShipmentCapabilitiesQuery.spec.ts`

**Interfaces:**
- Consumes: Task 1's PHP fix, which turns the emitted empty object into `{}` on the wire.
- Produces:
  - `ProxyCapabilitiesBody.options?: Record<string, Record<string, never>>`
  - `CapabilitiesSelection.options?: string[]` — capability keys currently on, e.g. `['requiresAgeVerification']`. Later plans populate this from the form.

- [ ] **Step 1: Write the failing tests**

Append to `useShipmentCapabilitiesQuery.spec.ts`. Widen the local `RequestBody` type at the top of that file first:

```ts
type RequestBody = {
  recipient: {countryCode: string; isBusiness?: boolean};
  options?: Record<string, Record<string, never>>;
};
```

Then the tests:

```ts
  it('sends selected options as an object map', async () => {
    capturedBody = undefined;

    const selection = {...fullSelection(), options: ['requiresAgeVerification']};
    const query = useShipmentCapabilitiesQuery(ref(selection)) as unknown as QueryFnHolder;

    await query.queryFn();

    expect(capturedBody?.options).toEqual({requiresAgeVerification: {}});
  });

  it('sorts option keys so the same selection always produces the same body', async () => {
    capturedBody = undefined;

    const selection = {...fullSelection(), options: ['requiresSignature', 'requiresAgeVerification']};
    const query = useShipmentCapabilitiesQuery(ref(selection)) as unknown as QueryFnHolder;

    await query.queryFn();

    expect(Object.keys(capturedBody?.options ?? {})).toEqual(['requiresAgeVerification', 'requiresSignature']);
  });

  it('omits options entirely when nothing is selected', async () => {
    capturedBody = undefined;

    const query = useShipmentCapabilitiesQuery(ref({...fullSelection(), options: []})) as unknown as QueryFnHolder;

    await query.queryFn();

    expect(capturedBody).not.toHaveProperty('options');
  });
```

The third test is the one that protects every existing caller: an empty selection must produce the body it produces today, so cached responses and query keys do not change.

- [ ] **Step 2: Run the tests to verify they fail**

```bash
cd ~/projects/js-pdk/apps/admin && vitest run src/actions/composables/queries/account/useShipmentCapabilitiesQuery.spec.ts
```

Expected: FAIL on all three — `capturedBody.options` is `undefined`.

- [ ] **Step 3: Fix the body type**

In `apps/admin/src/types/sdk.types.ts`, in `ProxyCapabilitiesDefinition`, replace the `options` line:

```ts
    options?: Record<string, Record<string, never>>;
```

Replace the stale sentence in that interface's docblock, which says option interactions resolve client-side, with:

```ts
   * `options` carries the shipment options currently switched on, as a map of capability key to
   * an empty object. The API resolves `requires` and `excludes` against that selection and returns
   * the resolved state, so no caller walks those rules itself.
```

- [ ] **Step 4: Add options to the selection and the body**

In `useShipmentCapabilitiesQuery.ts`, add the field to `CapabilitiesSelection`:

```ts
export type CapabilitiesSelection = {
  cc?: string;
  weight?: number;
  isBusiness?: boolean;
  carrier?: string;
  packageType?: string;
  deliveryType?: string;
  options?: string[];
};
```

Replace the second paragraph of that type's docblock — the one beginning "`options` and `filterSupported` are intentionally not part of the selection" — with:

```ts
 * `options` holds the capability keys currently switched on. It is part of the selection because
 * the API resolves requires/excludes against it, so a toggle changes the answer and must refetch.
 * `filterSupported` stays out of the selection: the composable always opts in to it.
```

In the query function, destructure `options` and build the map:

```ts
      const {cc, weight, isBusiness, carrier, packageType, deliveryType, options} = selection.value;
```

and add to the body, after `deliveryType`:

```ts
        // The API takes a map of capability key to an empty object, not a list. Sorting keeps the
        // body and the query key stable no matter what order the form hands the keys over in.
        ...(options?.length
          ? {
              options: Object.fromEntries(
                [...options].sort().map((key): [string, Record<string, never>] => [key, {}]),
              ),
            }
          : null),
```

The explicit `[string, Record<string, never>]` return annotation on the map callback is load-bearing. Without it `Object.fromEntries` infers the value as `{}`, which does not satisfy `Record<string, never>`, and Step 6 fails.

- [ ] **Step 5: Run the tests to verify they pass**

```bash
cd ~/projects/js-pdk/apps/admin && vitest run src/actions/composables/queries/account/useShipmentCapabilitiesQuery.spec.ts
```

Expected: PASS, all tests in the file including the three pre-existing `isBusiness` ones.

- [ ] **Step 6: Typecheck**

```bash
cd ~/projects/js-pdk && yarn typecheck
```

Expected: no **new** errors. `main` already carries roughly 30 pre-existing typecheck errors, so compare against a clean `main` run rather than expecting zero.

- [ ] **Step 7: Commit**

```bash
cd ~/projects/js-pdk
git add apps/admin/src/types/sdk.types.ts apps/admin/src/actions/composables/queries/account/useShipmentCapabilitiesQuery.ts apps/admin/src/actions/composables/queries/account/useShipmentCapabilitiesQuery.spec.ts
git commit -m "feat(admin): let the capabilities request carry the selected options"
```

---

### Task 3: Prove the round trip through a real PDK

Tasks 1 and 2 are unit-tested against mocks. Nothing yet proves that a request leaving a running PDK reaches the MyParcel API and comes back resolved. The whole plan rests on that, so it gets checked by hand once, and the result is written down.

**Files:**
- Modify: `docs/superpowers/specs/2026-09-16-shipment-option-determination.md` (record the result)

**Interfaces:**
- Consumes: Task 1 and Task 2.
- Produces: a recorded confirmation, or a defect that reopens Task 1.

- [ ] **Step 1: Start a plugin against the linked PDK**

Bring up either Docker environment with both PDKs linked. From `~/projects/docker-wordpress` or `~/projects/docker-prestashop`, run `pdk-dev-on` first if the linking is not already in place.

- [ ] **Step 2: Call the proxy endpoint with a selection**

In the plugin admin, open an order's shipment options modal, then in the browser console call the proxy the same way the query does — or, more directly, post to the `proxyCapabilities` endpoint URL from the page's PDK context with this body:

```json
{"carrier": "POSTNL", "recipient": {"countryCode": "NL"}, "packageType": "PACKAGE",
 "options": {"requiresAgeVerification": {}}}
```

- [ ] **Step 3: Check the request on the wire**

In the network tab, confirm the outgoing request body contains `"requiresAgeVerification":{}` and not `[]`.

- [ ] **Step 4: Check the response is resolved**

Confirm the response matches the table in the spec: `recipientOnlyDelivery` and `requiresSignature` come back with `isRequired: true`, and `requiresReceiptCode` is absent.

- [ ] **Step 5: Record the outcome**

Add one line under the spec's "The API resolves step two in full" section stating the date, the environment, and whether the PDK path matched the raw call. If it did not match, stop: the later plans are built on this and the defect belongs back in Task 1.

- [ ] **Step 6: Commit**

```bash
cd ~/projects/js-pdk
git add docs/superpowers/specs/2026-09-16-shipment-option-determination.md
git commit -m "docs(capabilities): record the verified pdk round trip"
```

---

## Out of scope

Named here so a reader does not go looking for them.

- **Populating `options` from the form.** The admin does not yet pass a selection. That is the next plan, and it is where the resolver deletions happen.
- **Insurance.** It is the one option that carries a value rather than an empty object, and the SDK types it as its own model (`CapabilitiesOptionsV2::$openAPITypes['insurance']`). Sending an insured amount needs its own task.
- **`CarrierCapabilitiesRepository` cache keys.** The cache key is `md5(json_encode($args))`, and `json_encode` renders `[]` and `stdClass` differently. No internal calculator sends `options` today, so nothing changes now — but the next plan makes them senders, and it must decide the key shape deliberately.
- **The widget.** `delivery-options` already types `options` correctly (`libs/shared/src/types/capabilities.types.ts:41`). It needs no change here, and its own plan is blocked on how the checkout re-resolves without one call per carrier.
