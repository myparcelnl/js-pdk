import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey, BackendEndpoint, type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER} from '../shipmentOptions/field';
import {getOrderId} from '../../utils';
import {useQueryStore} from '../../stores';
import {type SelectOption} from '../../types';
import {useContext, Format, type Formatter} from '../../composables';

interface InsuranceAmountData {
  insuredAmount?: {
    min: {amount: number; currency: string};
    max: {amount: number; currency: string};
    default: {amount: number; currency: string};
  };
}

const LOW_STEPS = 250;
const HIGH_STEPS = 500;
const LOW_THRESHOLD = 500;

/**
 * Bag of capability resolvers, each pre-bound to a Pinia store + orderId snapshot captured at
 * the composable's invocation time. Returned by {@link useFormCapabilities}.
 *
 * The functions are plain — they don't call `useQueryStore()` / `useContext()` / `getOrderId()`
 * on each invocation, so they're safe to call from outside Vue setup context (e.g. inside
 * vue-form-builder's `visibleWhen` / `disabledWhen` / `readOnlyWhen` / `afterUpdate`
 * watchEffect-driven re-evaluators, where `inject()` is not available).
 */
export type FormCapabilities = {
  /**
   * Resolve the chosen carrier's order-level capability data — destination + weight scope only.
   * Used to populate carrier / packageType / deliveryType dropdowns. `requires` / `excludes`
   * are NEVER populated through this path; they only appear on `getCarrierForShipment`.
   */
  getCarrierForOrder: (form: FormInstance) => CarrierModel | undefined;

  /**
   * Resolve the chosen carrier's shipment-level capability data — narrowed to the full
   * selection (carrier + packageType + deliveryType + cc + weight). Three return states:
   *
   * 1. **Shipment-narrow carrier** — query is `success` AND its results contain the chosen
   *    carrier. Returns that carrier with the narrow option set.
   * 2. **Order-level fallback** — query isn't registered, loading, or errored. Falls back to
   *    `getCarrierForOrder` so transient loading windows don't empty the form.
   * 3. **`undefined`** — query is `success` but its results don't contain the chosen carrier.
   *    Server has confirmed the combo is invalid; consumers must handle gracefully.
   */
  getCarrierForShipment: (form: FormInstance) => CarrierModel | undefined;

  /**
   * Whether the chosen shipment configuration supports a given option. Reads from the
   * shipment-scoped carrier; falls through to order-level data when shipment data isn't
   * available yet.
   */
  hasShipmentOption: (form: FormInstance, option: string) => boolean;

  /**
   * Insurance amount bracket options derived from the currently selected carrier's
   * `insuredAmount` data. Amounts in the context are in cents; emitted values are strings
   * representing cent amounts so they round-trip through form select inputs unchanged.
   */
  getInsuranceOptions: (form: FormInstance, formatter: Formatter) => SelectOption[];
};

/**
 * Closure-factory composable that captures Pinia + dynamic-context + orderId references ONCE at
 * its setup-context invocation, and returns plain resolver functions pre-bound to those
 * captures.
 *
 * Why this exists: form-builder's `visibleWhen` / `disabledWhen` / `readOnlyWhen` / `afterUpdate`
 * re-evaluators run inside an internal `watchEffect`, NOT inside Vue setup. Calling
 * `useQueryStore()` / `useContext()` / `getOrderId()` from those callbacks fires Vue's
 * `inject() can only be used inside setup()` warning AND can return a disconnected store
 * instance, breaking reactive dep tracking on `queries.value[modifier]`.
 *
 * Capturing once here, then closing over those references in the returned resolvers, gives
 * factories a single seam to call from setup — `const caps = useFormCapabilities()` — without
 * threading a context object through every helper signature.
 *
 * Pinia is a singleton, so all `useFormCapabilities()` callers within the same Pinia instance
 * reference the same underlying store. The dynamic-context carriers list is a static page-load
 * dump that doesn't change during a form's lifetime, so a snapshot is safe.
 */
export const useFormCapabilities = (): FormCapabilities => {
  const queryStore = useQueryStore();
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const dynamicCarriers = dynamicContext.carriers;
  const orderId = getOrderId();

  const orderModifier = typeof orderId === 'string' ? `${orderId}.order` : undefined;
  const shipmentModifier = typeof orderId === 'string' ? `${orderId}.shipment` : undefined;

  const carriersFromQuery = (modifier: string): CarrierModel[] | undefined => {
    if (!queryStore.has(BackendEndpoint.ProxyCapabilities, modifier)) return undefined;

    const query = queryStore.get(BackendEndpoint.ProxyCapabilities, modifier);

    if (toValue(query.status) !== 'success') return undefined;

    return (toValue(query.data) ?? []) as CarrierModel[];
  };

  const getCarrierForOrder = (form: FormInstance): CarrierModel | undefined => {
    const chosenCarrier = form.getValue(FIELD_CARRIER);

    if (orderModifier) {
      const carriers = carriersFromQuery(orderModifier);
      const fromQuery = carriers?.find((carrier) => carrier.carrier === chosenCarrier);

      if (fromQuery) return fromQuery;
    }

    return dynamicCarriers.find((carrier) => carrier.carrier === chosenCarrier);
  };

  const getCarrierForShipment = (form: FormInstance): CarrierModel | undefined => {
    if (!shipmentModifier) return getCarrierForOrder(form);

    const carriers = carriersFromQuery(shipmentModifier);

    if (!carriers) return getCarrierForOrder(form);

    const chosenCarrier = form.getValue(FIELD_CARRIER);

    return carriers.find((carrier) => carrier.carrier === chosenCarrier);
  };

  const hasShipmentOption = (form: FormInstance, option: string): boolean => {
    const carrier = getCarrierForShipment(form);

    return Object.hasOwn(carrier?.options ?? {}, option);
  };

  const getInsuranceOptions = (form: FormInstance, formatter: Formatter): SelectOption[] => {
    const carrier = getCarrierForShipment(form);
    const insuranceData = (carrier?.options?.insurance ?? {}) as InsuranceAmountData;

    const min = insuranceData.insuredAmount?.min.amount ? insuranceData.insuredAmount.min.amount / 100 : 0;
    const max = insuranceData.insuredAmount?.max.amount ? insuranceData.insuredAmount.max.amount / 100 : 0;

    if (max === 0) return [];

    const insurancePossibilities: number[] = [];

    for (let i = min; i <= max; i += i < LOW_THRESHOLD ? LOW_STEPS : HIGH_STEPS) {
      insurancePossibilities.push(i * 100);
    }

    return [
      {label: 'option_default', value: TriState.Inherit},
      ...insurancePossibilities.map((amount) => ({
        plainLabel: formatter.format(Format.Currency, amount / 100),
        value: amount.toString(),
      })),
    ];
  };

  return {
    getCarrierForOrder,
    getCarrierForShipment,
    hasShipmentOption,
    getInsuranceOptions,
  };
};
