// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {CheckoutSettings} from '@myparcel-pdk/frontend-checkout-core/src';

export const useSettings = (): CheckoutSettings => window.MyParcelPdk.stores.checkout.state.context.settings;
