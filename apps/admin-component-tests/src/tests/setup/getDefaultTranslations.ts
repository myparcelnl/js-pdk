import {vi} from 'vitest';
import {type GlobalAdminContext} from '@myparcel-pdk/frontend-admin-core';

export const getDefaultTranslations = vi.fn((): GlobalAdminContext['translations'] => ({}));
