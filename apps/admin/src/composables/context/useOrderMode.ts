import {type ComputedRef, computed} from 'vue';
import {type OrderMode, orderModeFromContextValue, resolveOrderMode} from '../../data';
import {useContext} from './useContext';

/**
 * Resolve the order mode the admin UI should adapt to.
 *
 * Prefers the pre-computed `effectiveOrderMode` emitted by the PDK admin context
 * (so any business rules applied on the PHP side — e.g. INT-1590's
 * sales-channel-conditional downgrade — naturally flow through). Falls back to
 * resolving from the raw IAM subscription features when the context does not
 * (yet) carry that value, which keeps older PDK versions working.
 */
export const useOrderMode = (): ComputedRef<OrderMode> => {
  const context = useContext();

  return computed(() => {
    // `effectiveOrderMode` is forward-looking — the PHP context generator may not
    // emit it yet. Cast locally rather than augmenting the generated type.
    const effective = orderModeFromContextValue(
      (context.account as {effectiveOrderMode?: unknown} | undefined)?.effectiveOrderMode,
    );

    return effective ?? resolveOrderMode(context.account?.subscriptionFeatures ?? []);
  });
};
