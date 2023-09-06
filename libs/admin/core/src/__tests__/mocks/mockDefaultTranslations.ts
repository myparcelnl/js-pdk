import {vi} from 'vitest';
import {type GlobalAdminContext} from '../../types';

export const mockDefaultTranslations = vi.fn((): GlobalAdminContext['translations'] => ({}));
