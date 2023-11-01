import {vi} from 'vitest';
import {type GlobalAdminContext} from '../../types';
import {BackendEndpoint} from '../../data';

export const mockDefaultEndpoints = vi.fn((): GlobalAdminContext['endpoints'] =>
  Object.values(BackendEndpoint).reduce((acc, endpoint) => {
    return {
      ...acc,
      [endpoint]: {
        body: '',
        headers: [],
        method: '',
        parameters: [],
        path: endpoint,
        property: '',
      },
    };
  }, {} as GlobalAdminContext['endpoints']),
);
