import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/admin-common';

export const mockDefaultCarriers = vi.fn((): Plugin.ModelContextDynamicContext['carriers'] => []);
