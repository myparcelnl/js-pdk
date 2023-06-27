import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/common';

export const getDefaultCarriers = vi.fn((): Plugin.ModelContextDynamicContext['carriers'] => []);
