# Shipment option determination

Confirmed 2026-09-16. This is the agreed functional model for how a shipment option gets its
value across the PHP PDK, the JS-PDK admin, and the delivery options widget.

## How a value is decided

Two steps, both of which already exist in the code.

**Step one: the tri-state chain picks a starting value.** `PdkOrderOptionsService::calculateShipmentOptions()`
asks four helpers in order and takes the first answer that is not inherit
(`TriStateService::resolve`):

1. `ShipmentOptionsDefinitionHelper` — what is already stored on the order, from a consumer's
   choice in the checkout or a merchant's edit in the admin.
2. `ProductSettingsDefinitionHelper` — the products in the order. On beats off.
3. `CarrierSettingsDefinitionHelper` — the merchant's export default for this carrier.
4. `CapabilitiesDefaultHelper` — the carrier's own default, from the contract definitions stored
   on the account.

**Step two: capabilities says what is actually possible.** One request carrying the options step
one switched on, plus carrier, destination, package type, delivery type and weight. It is never
asked about a blank shipment — it always knows what the chain above it decided. The response is the
answer: what is available, what is required, what is excluded. In the checkout the delivery_options
endpoint narrows further, per delivery moment, which capabilities cannot do because it does not
know the moment.

Anything the consumer or the merchant changes re-runs step two. Nothing else happens. There is no
separate validation before export — the API rejects what it will not accept.

The `allow` setting is not part of either step. It decides whether the consumer gets a control,
never what the value is. A carrier-required option the merchant disallowed is on, and the consumer
simply has no checkbox for it.

## Rules

- `allow` governs whether the consumer may choose. It never governs the value. An option the
  carrier requires and the merchant disallowed is on, and the consumer gets no checkbox for it.
- The order stores tri-states, including inherit, and resolution runs on read. The order holds what
  the next export should use, not what a past export produced.
- A shipment holds facts and is permanent once its label is printed.
- The consumer's pick and the merchant's override share one field. A merchant clearing their own
  override falls back to the carrier default, not to the consumer's pick. Accepted knowingly.
- Options are typed, and the types come from the API. Boolean and amount-with-bounds today.
- Label description, label amount and dimensions are not options. No carrier decides whether you
  may write a label description.
- Package type and delivery type resolve before options do, because the capabilities request needs
  them.
- An option is consumer-facing when it has an allow setting.
- **Do not funnel the merchant.** In the admin, a merchant must never have to work out by
  elimination which of their own choices is blocking them. An option the carrier does not offer
  here is not shown. An option that is possible here but blocked by something the merchant switched
  on stays on screen, locked, with the reason next to it. Undoing the cause restores exactly what
  was there. The consumer side may hide a blocked option, because a consumer is choosing rather
  than administering.

  This costs something concrete. Capabilities resolves an exclusion by removing the option from the
  response, so rendering the response literally makes a blocked option vanish with no explanation.
  Telling the two cases apart needs two answers: the response with no options sent, and the
  response for the current selection. Present in the first and missing from the second is the
  locked case.
- When capabilities cannot be reached, every surface fails loudly and changes nothing.
- Contract ought to be part of the identity in the PDK and admin, and the checkout would stay
  carrier-only until the delivery_options endpoint supports contracted carriers. Agreed as correct,
  deferred until a real case turns up rather than built ahead of one.
- A reason line appears only where capabilities or a rule overruled the tri-state chain.

## The API resolves step two in full

Verified on production against PostNL, 2026-09-16. `POST /shipments/capabilities` accepts the
currently selected options and returns the resolved state.

Request:

```json
{"carrier": "POSTNL", "recipient": {"countryCode": "NL"}, "packageType": "PACKAGE",
 "options": {"requiresAgeVerification": {}}}
```

Compared with the same request without `options`:

| option | baseline | with age check requested |
| --- | --- | --- |
| `recipientOnlyDelivery` | `isRequired: false` | `isRequired: true`, `isSelectedByDefault: true` |
| `requiresSignature` | `isRequired: false` | `isRequired: true`, `isSelectedByDefault: true` |
| `requiresReceiptCode` | present | absent from the response |

It resolves `requires` by flipping the targets to required, and `excludes` by removing the option
from the response. That is the whole traversal, including the conflict tie-break, done once and
authoritatively.

It also resolves every carrier at once. The same request **without** a `carrier` returns each
carrier resolved independently, and drops the ones that cannot do the requested option:
six carriers become four, PostNL gains two required options and loses `requiresReceiptCode`,
UPS gains `requiresSignature`, and DHL Europlus and DPD disappear. So a surface that renders all
carriers together needs one request, not one per carrier.

Also verified: `priorityDelivery` is returned for NL and absent for BE, DE, FR and US, so the
country rule the widget hardcodes is already answered by the API (INT-1927).

Both capabilities endpoints are still beta.

## What this costs in requests

Sending the selection means re-asking when the selection changes. INT-1920 is deciding rate
limiting on capabilities and gates anything that raises volume. The constraint is temporary, so
nothing here is designed around it.

The admin lands on a handful of settled option states per order edit, behind the existing 100 ms
debounce and the client-side query cache, so a toggled-then-untoggled option costs nothing the
second time. The checkout adds one request per settled state, for all carriers together.

Note the proxy path is uncached: `CapabilitiesAction` calls `CapabilitiesService` directly, while
the `md5(json_encode($args))` cache in `CarrierCapabilitiesRepository` sits on the calculator path
only.

## Consequence

Three codebases each wrote their own requires/excludes traversal, and each wrote a comment
explaining why the selection is not sent:

- `pdk` — `CapabilitiesOptionCalculator::getCarrierCapabilities()` builds its request without
  `options` (`src/App/Order/Calculator/General/CapabilitiesOptionCalculator.php:113-121`).
- `js-pdk` — "`options` and `filterSupported` are intentionally not part of the selection: option
  toggles don't drive refetches (option interactions resolve client-side)"
  (`apps/admin/src/actions/composables/queries/account/useShipmentCapabilitiesQuery.ts:18-20`).
- `delivery-options` — "User-selectable fields (deliveryType, options, carrier) are intentionally
  omitted … to avoid a network round-trip on every selection change"
  (`libs/shared/src/composables/useSharedCapabilities.ts:26-32`).

Sending the selection deletes all three traversals, their conflict tie-breaks, and the state
machines built around them.

## Deferred, knowingly

Per-contract settings screens and contract identity generally. Collapsing the sixteen option
definition classes into a data table — considered, and the current shape is fine. The
delivery_options moment rules in the admin. Rendering options the PDK has not registered. Removing
the export calculators. The future of bulk edit.

How the checkout re-resolves per click without one call per carrier is **answered**, not deferred:
one request resolves every carrier. What remains is INT-1920, which decides rate limiting and gates
anything that raises request volume.

## One rule stays local

Age check forces parcel locker exclusion on, and not the other way round. Capabilities does not
express this: a LOCKER pickup request with age check returns PostNL, DHL For You and both UPS
contracts, the same set as the request without the pickup filter, so nothing was excluded on
account of the locker. The two carriers that do disappear cannot do age verification at all.
Verified on production, 2026-09-16. `CartCalculationService::calculateExcludeParcelLockers()` keeps
the rule, and its any-line-on-wins merge is the correct one — INT-1926 brings the shipment options
path into line with it.
