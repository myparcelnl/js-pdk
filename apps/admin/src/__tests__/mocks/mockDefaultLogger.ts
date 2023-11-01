import {vi} from 'vitest';
import {createLogger} from '../../services';

export const mockDefaultLogger = vi.fn(() => createLogger('test'));
