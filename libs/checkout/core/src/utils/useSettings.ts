// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {type CheckoutSettings} from '../types';

export const useSettings = (): CheckoutSettings => window.MyParcelPdk.stores.checkout.state.context.settings;
