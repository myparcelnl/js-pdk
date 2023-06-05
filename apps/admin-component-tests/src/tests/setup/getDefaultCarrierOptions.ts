import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/common';

export const getDefaultCarrierOptions = vi.fn((): Plugin.ModelContextDynamicContext['carrierOptions'] => []);
