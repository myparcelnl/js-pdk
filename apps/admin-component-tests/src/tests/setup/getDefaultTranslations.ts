import {vi} from 'vitest';
import {type GlobalAdminContext} from '@myparcel-pdk/admin-core';

export const getDefaultTranslations = vi.fn((): GlobalAdminContext['translations'] => ({}));
