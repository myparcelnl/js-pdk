import {vi} from 'vitest';
import {createLogger} from '../../services/logger';

export const mockDefaultLogger = vi.fn(() => createLogger('test'));
