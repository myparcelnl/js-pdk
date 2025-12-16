import {vi} from 'vitest';
import {type Plugin} from '@myparcel-dev/pdk-common';

export const mockDefaultCarriers = vi.fn((): Plugin.ModelContextDynamicContext['carriers'] => []);
